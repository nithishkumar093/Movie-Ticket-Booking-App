import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "movie-ticket-booking" });

//Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async ({ event, step }) => {
        const { id, first_name, last_name, email_addresses, image_url, profile_image_url } = event.data
        const userData = {
            _id: id,
            email: email_addresses?.[0]?.email_address || "",
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            image: image_url || profile_image_url || ""
        }
        console.log("Inngest: syncUserCreation triggered for ID:", id);

        await step.run('save-user-to-db', async () => {
            const result = await User.findByIdAndUpdate(id, { $set: userData }, { upsert: true, new: true })
            console.log("Inngest: User saved/updated in DB:", result?._id);
        })
    }
)

//Inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-from-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event, step }) => {
        const { id } = event.data
        console.log("Inngest: syncUserDeletion triggered for ID:", id);

        await step.run('delete-user-from-db', async () => {
            await User.findByIdAndDelete(id)
            console.log("Inngest: User deleted from DB:", id);
        })
    }
)
//Inngest function to update user from database
const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event, step }) => {
        const { id, first_name, last_name, email_addresses, image_url, profile_image_url } = event.data
        const userData = {
            email: email_addresses?.[0]?.email_address || "",
            name: `${first_name || ""} ${last_name || ""}`.trim(),
            image: image_url || profile_image_url || ""
        }
        console.log("Inngest: syncUserUpdation triggered for ID:", id);

        await step.run('update-user-in-db', async () => {
            const result = await User.findByIdAndUpdate(id, { $set: userData }, { new: true })
            console.log("Inngest: User updated in DB:", result?._id);
        })
    }
)

export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation
];
