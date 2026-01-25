import express from "express"
import cors from 'cors'
import 'dotenv/config'
import { database } from "./config/db.js"
import { favroutiesTable } from "./db/Schema.js"
import { and, eq } from "drizzle-orm"
const app = express()


app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.json('server is runnig')
})


app.post('/api/favroites', async(req , res)=>{

    try {
      
      const {userId , recipeId , title , cooktime , image , servings} = req.body 
      
      if(!userId || !recipeId || !title){
        res.status(401).json({success:false , message:'missing require fields'})
      }
      
     const newFavorite = await database.insert(favroutiesTable).values({
        userId , recipeId , title , cooktime , image , servings
      })
      .returning()  

       res.status(201).json(newFavorite[0])

     } catch (error) {
      
      console.log('error adding favroites' , error)
      res.status(501).json({error:'Something went wrong'})
    }
})


  app.delete('/api/favroites/:userId/:recipeId' , async(req, res)=>{

     try {
      
        const {recipeId , userId} = req.params

         await database.delete(favroutiesTable).where(
          and(eq(favroutiesTable.userId,userId) , eq(favroutiesTable.recipeId , parseInt(recipeId)))
         )

         res.status(200).json({mesage:'Favroite  Removed Successfully'})

     } catch (error) {
      
       console.log('error adding favroites' , error)
      res.status(501).json({error:'Something went wrong'})

     }

  })


   app.get('/api/favroites/:userId' , async(req , res)=>{
    try {
      
      const {userId} = req.params
       
      const userFavroite = await database.select().from(favroutiesTable).where(eq(favroutiesTable.userId , userId ))

       res.status(200).json(userFavroite)

    } catch (error) {
       console.log('error adding favroites' , error)
      res.status(501).json({error:'Something went wrong'}) 
    }
   })


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
  console.log(`server is running on http://localhost:${PORT}`)
})

