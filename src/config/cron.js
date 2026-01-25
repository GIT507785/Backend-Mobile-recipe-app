import cron from 'cron'
import https from 'https'


const job = new cron.CronJob( '*/14 * * * *' ,()=>{
https.get(process.env.API_URL ,(res)=>{
   if(res.statusCode === 200)  console.log('Get Request Sent Successfully')
    else  console.log('Get Request Failed' , res.statusCode)
}).on('error' , (e)=> console.log(' Error while sending request' , e))

})

export default job