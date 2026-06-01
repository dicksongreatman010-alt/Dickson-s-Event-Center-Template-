#!/usr/bin/env node
import { v2 as cloudinary } from 'cloudinary';

// STEP 3 — Configure Cloudinary using the provided credentials
cloudinary.config({ 
  cloud_name: 'dojayb3ro', 
  api_key: '597354618283354', 
  api_secret: 'Vv9t9Eo5xFeXx3QhDfrntw27_Jk',
  secure: true
});

async function run() {
  try {
    console.log('1. Starting Cloudinary upload process...');
    
    // Choose a sample image URL from Cloudinary's demo domain
    const sampleImageUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';
    
    // Upload the image
    const uploadResult = await cloudinary.uploader.upload(sampleImageUrl, {
      public_id: 'cloudinary_onboarding_sample'
    });

    console.log('\n--- UPLOAD RESULT ---');
    console.log(`Secure URL: ${uploadResult.secure_url}`);
    console.log(`Public ID: ${uploadResult.public_id}`);

    // Fetch details to explicitly "fetch and print" metadata as requested
    console.log('\n2. Fetching metadata details for the uploaded image...');
    const details = await cloudinary.api.resource(uploadResult.public_id);
    
    console.log('\n--- IMAGE METADATA ---');
    console.log(`Width: ${details.width}`);
    console.log(`Height: ${details.height}`);
    console.log(`Format: ${details.format}`);
    console.log(`File Size: ${details.bytes} bytes`);

    // Transform the image URL with automatic optimization transformations
    const transformedUrl = cloudinary.url(uploadResult.public_id, {
      // fetch_format: 'auto' (f_auto) dynamically selects the best format (AVIF, WebP, etc.) for the requesting browser to minimize size.
      fetch_format: 'auto',
      // quality: 'auto' (q_auto) optimizes visual compression and keeps the file size down with no noticeable drop in visual quality.
      quality: 'auto',
      secure: true
    });

    console.log('\n----------------------------------------');
    console.log('Done! Click link below to see optimized version of the image. Check the size and the format.');
    console.log(transformedUrl);
    console.log('----------------------------------------\n');

  } catch (error) {
    console.error('An error occurred during execution:', error);
  }
}

run();
