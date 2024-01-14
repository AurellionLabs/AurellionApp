pragma solidity ^0.8.17;
import "./Aura.sol" as AuraContract; 

// TO DO use smart contracct account pf the token for the treasury and create a private fuinctioion that auto mints
contract locationContract {
    enum Status {Pending, InProgress, Completed, Canceled}
    struct Location {
        string lat;
        string lng;
    }

    struct ParcelData {
        Location startLocation;
        Location endLocation;
        string startName;
        string endName;

        //add customer?
        //add driver?
        //add box
    } 

    struct Journey {
        ParcelData parcelData;
        bytes32 jobId;
        Status currentStatus;
        address customer;
        address reciever;
        address driver;
        uint journeyStart;
        uint journeyEnd;
        uint bounty;
        uint ETA;
    }

    struct SubJourney {
        ParcelData parcelData;
    }


    // Map a journey to multiple sub journeys
    mapping(bytes32 => mapping(uint256 => SubJourney)) journeys;

    // Keep count of which sub journey of a journey the parcel is on
    mapping(bytes32 => uint256) subJourneyCount;

    // Map the drivers address to a Journey/SubJourney, need to add address => uint => bytes32
    // need to map this to a list of bytes
    mapping(address => bytes32[]) public driverToJobId;
    // maps a customer to a job
    mapping(address => bytes32[]) public customerToJobId;
    mapping (address => uint256) public numberOfJobsCreatedForCustomer;
    // driver related mappings
    mapping (address => uint256) public numberOfJobsAssigned;

    // maps a receiver to a job
    mapping(address => bytes32[]) public receiverToJobId;
    mapping (address => uint256) public numberOfJobsCreatedForReceiver;
    // Map Job ID to Journey
    mapping(bytes32 => Journey) public  jobIdToJourney;
    
    // maps number to JOB id for the purpose of iterating through jobs 
    mapping(uint => bytes32) public numberToJobID;
    // a bool that checks if the customer has handed off the package (need to change this to address => journey or job id => bool 
    mapping(address => mapping(bytes32 => bool)) customerHandOff;
    mapping(address => mapping(bytes32 => bool)) driverHandOn;
    //maps a job to a corresponding box
    mapping(bytes32 => uint) jobToBox;
    // maps a customer address to running balance of their token amount
    mapping(address => uint) customerToTokenAmount;

    mapping(address => bool) recieverHandOff;
    Journey[] public subJourneys;
    uint public jobIdCounter = 0;
    AuraContract.Aura auraToken;

    constructor(AuraContract.Aura _aura){
        auraToken = _aura;
    }
    
    // vulnerability somebody 
    modifier customerDriverCheck(address customer, address driver,bytes32 id){
        require(jobIdToJourney[id].driver == driver &&  jobIdToJourney[id].customer == customer || jobIdToJourney[id].reciever == customer,"Was not correct 1");
        require(msg.sender == customer || msg.sender == driver,"Was not correct 2");
        _;
    }
    modifier DriversBoxVerify(address driver, uint box){
        //require(jobToBox[driverToJobId[driver]] == box);
        _;
    }
    modifier isInProgress(bytes32 id){
        require(jobIdToJourney[id].currentStatus == Status.InProgress , "Job is not in Progress");
        _;
    }
    modifier isCompleted(bytes32 id){
        require(jobIdToJourney[id].currentStatus == Status.Completed, "Job is Incomplete");
        _;
    }
    function journeyKeyHashing(Journey memory journey) private pure returns (bytes32){
        return keccak256(abi.encode(journey));
    }

    function getHashedJobId() private returns(bytes32) {
        return keccak256(abi.encode(jobIdCounter+=1));
    }
    event emitSig(bytes32 id,string signed);
    //could you exploit this feature by an agent calling from a non aurellion source  assign themseleves to all jobs then not showing up
    function assignDriverToJobId(address driver, bytes32 jobID) public {
        driverToJobId[driver].push(jobID);
        jobIdToJourney[jobID].driver = driver;
        numberOfJobsAssigned[driver] +=1; 
    }
    function packageSign(address driver, address customer, bytes32 id) customerDriverCheck(customer,driver,id) public {
        if(msg.sender == customer){
            customerHandOff[customer][id] = true;
            emit emitSig(id,"Signed");
        }

        if(msg.sender == driver){
            driverHandOn[driver][id] = true;
            emit emitSig(id,"Signed");
        }

        if(customerHandOff[customer][id] == true && driverHandOn[driver][id] == true){
            emit emitSig(id,"Signed");
        } 
    }
    function boxActivate(address driver, uint box) DriversBoxVerify(driver,box) public pure returns(bool) {
        //activation code here
        return true;
    }
    // verify person has enough funds in contract
    // TODO: function wasn't working because the isCompleted modifier was wrong. Corrected it, need to retest.
    function generateReward(bytes32 id, address driver) isCompleted(id) public {
        uint completeJourney = jobIdToJourney[id].journeyEnd - jobIdToJourney[id].journeyStart;
        emit printUint(completeJourney);
        // to find reward you didvide the ETA by the time it was completed in. this will give you a number less than 1 which you then multiply the reward by to give the driver  a fraction of that reward. 
        // if driver completed it quicker it will do the opposite .
        //need to consider whether the treausry gives extra reward for the faster delivery proportional to the excess of the fraction( the amount the customer didnt provide but is entitled to the driver as bonus.          
        //may have to * by x**10*y to make sure decimals are taken into account
        uint reward =  jobIdToJourney[id].ETA * jobIdToJourney[id].bounty * 10 ** 18/ completeJourney;
        emit printUint(reward);
        // transfer reward here
        auraToken.transfer(driver, reward);
        customerToTokenAmount[jobIdToJourney[id].customer] -= jobIdToJourney[id].bounty;
    }

    event printUint(uint256 value); 

    function assignJobToBox(bytes32 job,uint box) public {
                    jobToBox[job] = box;
    }
    function handOn(address driver, address customer,bytes32 id) customerDriverCheck(customer,driver,id) public returns (bool){
        if(customerHandOff[customer][id] == true && driverHandOn[driver][id] == true) {
            jobIdToJourney[id].currentStatus = Status.InProgress;
            jobIdToJourney[id].journeyStart = block.timestamp;
            driverHandOn[driver][id] == false;
            customerHandOff[customer][id] == false;
            return true;
        }
        else{
            return false;
        }
    }
    function handOff(address driver, address reciever, bytes32 id) isInProgress(id) customerDriverCheck(reciever,driver,id) public returns (bool){
        if(customerHandOff[reciever][id] == true && driverHandOn[driver][id] == true) {
            jobIdToJourney[id].currentStatus = Status.Completed;
            jobIdToJourney[id].journeyEnd = block.timestamp;
            
            generateReward(id,driver);
            return true;
        
        }
        else{
            return false;
        }
    }

    //TO DO make function to send funds to treasury

    //function uploads(ParcelData memory _data) public {
            //Journey memory journey = Journey({parcelData: _data, jobId: getHashedJobId(), currentStatus: Status.Pending, customer: address(0), driver: address(0), reciever: address(0) });
            //jobIdToJourney[journey.jobId] = journey;
            //jobToBox[journey.jobId] = jobIdCounter;

            // SubJourney memory subJourney = SubJourney({parcelData: _array[i]});

            // journeys.push(journey);
            // journeys[journey][subJourneyCount[journey] += 1] = subJourney;

            // subJourneyCount[journeyKeyHashing(journey)]+=1;
            // journeys[journeyKeyHashing(journey)][subJourneyCount[journeyKeyHashing(journey)]] = subJourney;
            // SubJourney memory xyz = journeys[journeyKeyHashing(journey)][subJourneyCount(journeyKeyHashing(journey))+=1];
   // }
    function jobCreation(address customer, address reciever, ParcelData memory _data, uint bounty, uint ETA) public {
        // TO DO transfer bounty  from customer to contract make mapping of customer => tokens and make a withdraw function later 
        auraToken.transferFrom(customer, address(this), bounty * 10 ** 18);
        customerToTokenAmount[customer] += bounty;
        Journey memory journey = Journey({
            parcelData: _data, 
            jobId: getHashedJobId(), 
            currentStatus: Status.Pending, 
            customer: customer, 
            driver: address(0), 
            reciever: reciever, 
            journeyStart: 0,
            journeyEnd: 0, 
            bounty: bounty, 
            ETA: ETA
        });
        jobIdToJourney[journey.jobId] = journey;
        jobToBox[journey.jobId] = jobIdCounter;

        numberOfJobsCreatedForCustomer[customer] += 1;
        customerToJobId[customer].push(journey.jobId);

        numberOfJobsCreatedForReceiver[reciever] += 1; 
        receiverToJobId[reciever].push(journey.jobId);  
        // add jobId to global mapping of jobs
        numberToJobID[jobIdCounter] = journey.jobId;
    }
}