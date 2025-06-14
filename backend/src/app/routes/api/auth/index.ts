import { PrismaClient, Student } from '@prisma/client';
import { FastifyInstance, FastifyRequest } from 'fastify';
const path = require('path');
const fs = require('fs');

import bcrypt from 'bcrypt';
export default async function (fastify: FastifyInstance) {
  const prisma = new PrismaClient();
 

fastify.post('/register', async (req, reply) => {
  const { name, email, password,role } = req.body as Student;

  if (!name || !email || !password) {
    return reply.code(400).send({ error: 'Missing fields' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
       role: role || null, 
      },
    });

    reply.send({ success: true, message: 'Registered successfully!', user });
  } catch (e: any) {
    console.error("Registration Error:", e);
    reply.code(500).send({ error: e.message });
  }
});


  fastify.post('/login', async (req, reply) => {
    const { email, password } = req.body as { email: string, password: string };
  
    if (!email) return reply.code(400).send({ error: 'Email is required' });
  
    const student = await prisma.student.findUnique({ where: { email } });
  
    if (!student) return reply.code(404).send({ error: 'Student not found' });
  
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) return reply.send({ error: 'Invalid password' });

    return reply.send({ success: true, student });
  });



  
  
}



