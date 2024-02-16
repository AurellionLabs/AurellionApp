import { BigNumber, ethers } from 'ethers';
import { Journey } from '../types/types';

export const dateConversion = (dateTimeString: string): Date => {
  const dateVal = ethers.BigNumber.from(dateTimeString).toNumber();
  const date = new Date(dateVal * 1000);
  return date;
};

export const processJobObject = (job: Journey): Journey => {
  // Have to create a mutable version of Job, since the object is frozen and sealed
  let mutableJob: Journey = { ...job };
  mutableJob.createdDateTime = dateConversion(job.createdDateTime).toLocaleString('en-GB');
  mutableJob.journeyStart = dateConversion(job.journeyStart).toLocaleString('en-GB');
  mutableJob.journeyEnd = dateConversion(job.journeyEnd).toLocaleString('en-GB');
  console.log('\n\n\n\nmutated Job:');
  console.log(mutableJob);
  console.log('\n\n');
  return mutableJob;
};
