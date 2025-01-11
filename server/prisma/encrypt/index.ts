import { PrismaClient } from '@prisma/client';

import { encrypt } from '../../src/web3';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting private key encryption process...');

  // Fetch all users from the database
  const users = await prisma.user.findMany({
    select: { id: true, private_key: true },
  });

  console.log(`Found ${users.length} users. Processing...`);

  for (const user of users) {
    try {
      const { id, private_key } = user;

      // Check if the key is already encrypted (heuristic: look for ':' in the format)
      if (private_key.includes(':')) {
        try {
          continue;
        } catch (error) {
          console.warn(
            `Private key for user ID ${id} appears corrupted or invalid. Skipping...`
          );
          continue;
        }
      }

      // Encrypt the private key if not already encrypted
      const encryptedKey = encrypt(private_key);

      // Update the user's private key in the database
      await prisma.user.update({
        where: { id },
        data: { private_key: encryptedKey },
      });

      console.log(`Encrypted private key for user ID: ${id}`);
    } catch (error) {
      console.error(
        `Failed to process private key for user ID: ${user.id}`,
        error
      );
    }
  }

  console.log('Private key encryption process completed.');
}

main()
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
