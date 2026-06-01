const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dojayb3ro',
  api_key: '597354618283354',
  api_secret: 'Vv9t9Eo5xFeXx3QhDfrntw27_Jk',
  secure: true
});

const commitHash = 'c4f095fb69ae972aac7f13ff141fe01498fad9e2';

const imagesToUpload = {
  comfortArinola: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAFNHmbvAF2erJ1sujVtaAzV4_dzeSe_dzgObpu8o8Au5ecxtVyHs5qbWi46CcW9FV0AHXi9gcXVIX9h8ver8DeCvwkiiVuW74E_hKFaMAANObglZtxiz0I1mxVZ-1FIZEkS5roE=s516-k-no',
  atinukeHallNew: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.54%20AM%20(1).jpeg`,
  pentonImage1: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.54%20AM%20(2).jpeg`,
  pentonImage2: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.54%20AM.jpeg`,
  pentonImage3: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.55%20AM%20(1).jpeg`,
  pentonImage4: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.55%20AM%20(2).jpeg`,
  pentonImage5: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.01.55%20AM.jpeg`,
  pentonImage6: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.13.21%20AM%20(2).jpeg`,
  pentonImage7: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/WhatsApp%20Image%202026-05-30%20at%207.13.21%20AM.jpeg`,
  pentonImage8: `https://raw.githubusercontent.com/dicksongreatman010-alt/Dickson-s-Event-Center-Template-/${commitHash}/Pentonrise/uy.jpeg`,
  atinukeHall1: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGpBU-eomLmuKAsQsXGt-VvtZDnmADWW70-aXbYfJHS3tBT2xxqe9TNEPaqagUabavHWHGC83UVndnKwnAveN_vfhB1qzYqF8HcbKOz8pDnrrj6axY7Ub5LQC8s8glQhhUbWRBOUA=s644-k-no',
  victoriaHall: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAH9Yr5nFwH6g9DmwqfbwP41yFRZ3mexn78m5XRV6zSvnHVxQiTiSmT7eYbyXQT_MWG0o1wyVNbjsFF_DZkfgIZ-ngBXSKOk8rkQAobsIuR96kYKQTtnr6YeZOr74-bOTkoWvTbAgg=s644-k-no',
  greenCarpet: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGgqjDRymqyFtEAu2KCFKTEZsMqrugDL1FGzDIMoPnfQcarBGYyqqq5MIUoebLm4tjzj9YFTftV6NxkgJUXZRRYB0f0jMBFT3RW_i4aJ6PhJBV4gf-pPLy8Kws_3_IDRSwQADk=s644-k-no',
  radiantDrapery: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGtqciw5DxVGoB09WBjLrj7D1Vjjh0x5CRM-b16tLrpCmQ1I4Om9GCil3RZJI1tfUrveVbyswAXbUoTy_XHDjEL2QuOaj2qgpvHgYduXUwBFetifBZhZFZQAv74QZbAnjEFRkaY=s516-k-no'
};

async function uploadImages() {
  console.log('--- STARTING BULK CLOUDINARY UPLOAD SPECIFIC REPO ---');
  let results = {};
  
  // Try to load any existing results to avoid duplicate uploads if re-running
  if (fs.existsSync('cloudinary-uploads.json')) {
    try {
      results = JSON.parse(fs.readFileSync('cloudinary-uploads.json', 'utf8'));
    } catch (_) {}
  }

  for (const [key, url] of Object.entries(imagesToUpload)) {
    // If already successfully uploaded, skip to keep it super fast and save quota/duration
    if (results[key] && results[key].optimized_url) {
      console.log(`Skipping ${key} - already uploaded.`);
      continue;
    }

    const tempFile = path.join(__dirname, `temp_${key}.jpg`);
    try {
      console.log(`Downloading ${key} locally using fetch...`);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download ${key}: HTTP ${response.status} ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      fs.writeFileSync(tempFile, Buffer.from(arrayBuffer));
      console.log(`Successfully downloaded ${key} size=${fs.statSync(tempFile).size} bytes.`);

      console.log(`Uploading ${key} to Cloudinary...`);
      const uploadResult = await cloudinary.uploader.upload(tempFile, {
        folder: 'pentonrise',
        public_id: key,
        overwrite: true,
        invalidate: true
      });

      const optimizedUrl = cloudinary.url(uploadResult.public_id, {
        fetch_format: 'auto',
        quality: 'auto',
        secure: true
      });

      results[key] = {
        original: url,
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
        optimized_url: optimizedUrl
      };
      
      console.log(`SUCCESS [${key}]: ${optimizedUrl}`);
      // Save incrementally so we don't lose progress if any unexpected errors happen
      fs.writeFileSync('cloudinary-uploads.json', JSON.stringify(results, null, 2));
    } catch (err) {
      console.error(`ERROR [${key}]:`, err.message);
    } finally {
      if (fs.existsSync(tempFile)) {
        try {
          fs.unlinkSync(tempFile);
        } catch (_) {}
      }
    }
  }

  console.log('\nBulk upload complete! Check cloudinary-uploads.json');
}

uploadImages();
