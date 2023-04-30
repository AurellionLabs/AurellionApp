async function fetchLocation(home,box,to){
    
    let APIHome= ''
    for (let i = 0; i < home.length; i++) {
        home = home.replace(`,`,`%2C`)
      }
    for (let i = 0; i < box.length; i++) {
        box = box.replace(`,`,`%2C`)
      }
    for (let i = 0; i < to.length; i++) {
        to = to.replace(`,`,`%2C`)
      }
    const APIUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${home}%7C${box}&destinations=${to}&key=AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA`
    let response = await fetch(APIUrl)
    const data = await response.json()
    console.log(home)
    console.log(box)
    console.log(to)
    console.log(data["rows"][0]["elements"][0]["distance"]["value"])
    console.log(data["rows"][1]["elements"][0]["distance"]["value"])
    const LToB = data["rows"][0]["elements"][0]["distance"]["value"]
    const BToD = data["rows"][1]["elements"][0]["distance"]["value"]
    const Total = LToB + BToD
    if(Total < ShortestPath) {
        console.log("Old Path " +ShortestPath)
        ShortestPath = Total
        console.log("New Path! "+ShortestPath)
    }
    console.log(ShortestPath)
    return Total
}
