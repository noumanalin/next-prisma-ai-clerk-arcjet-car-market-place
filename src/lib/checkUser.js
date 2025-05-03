import { currentUser } from '@clerk/nextjs/server'
import { db } from './prisma.js'

export const checkUser = async ()=>{
    const user = await currentUser()

    if(!user){ return null }

    try {
        const isUserSavedInDB = await db.user.findUnique({
            where:{ clerkUserId: user.id}
        })

        if(isUserSavedInDB){ return isUserSavedInDB }

        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name: `${user.firstName} ${user.lastName}`,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,        
            }
        })

        return newUser;

    } catch (error) {
        console.log(error.message)
        return error.message
    }
}