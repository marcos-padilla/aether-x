import * as z from 'zod'
import { signUpSchema } from './schemas'

/** SCHEMAS */

export type SignUpSchema = z.infer<typeof signUpSchema>
