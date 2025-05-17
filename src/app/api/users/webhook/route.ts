import { verifyWebhook } from '@clerk/backend/webhooks'
import { eq } from 'drizzle-orm'

import { db } from '@/db'
import { users } from '@/db/schema'

export async function POST(req: Request) {

  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET
  
  if(!SIGNING_SECRET){
    throw new Error("Error: Please add CLERK_SIGNING_SECRET from Clerk dashboard to .env or .env.local")
  }


  try {
    const evt = await verifyWebhook(req, {
    signingSecret: process.env.CLERK_SIGNING_SECRET || '',
    });

    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt.type


    if(eventType === "user.created"){
      const { data } = evt
      await db.insert(users).values({
        clerkId: data.id,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url
      })
    }

    if(eventType === "user.deleted"){
      const { data } = evt;

      if(!data.id){
        return new Response("Missing user id",{ status: 400 });
      }

      await db.delete(users).where(eq(users.clerkId, data.id))
    }

    if(eventType === "user.updated"){
      const { data } = evt;

      await db.update(users).set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url
      })
      .where(eq(users.clerkId, data.id));
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}