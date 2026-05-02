const fs = require('fs');

let content = fs.readFileSync('src/data.ts', 'utf8');

// The array starts at `export const resources: Resource[] = [`
const startIdx = content.indexOf('export const resources: Resource[] = [');
if (startIdx === -1) throw new Error('Could not find resources array');

// Find the end of the array. It ends with `];` at the end of the file.
const endIdx = content.lastIndexOf('];');
if (endIdx === -1) throw new Error('Could not find end of resources array');

const arrayStr = content.substring(content.indexOf('[', startIdx), endIdx + 1);

let resources = eval('(' + arrayStr + ')');

const descriptions = [
  "This exceptional resource provides unparalleled value for your creative workflow.",
  "Meticulously crafted to ensure the highest quality standards, saving you hours of manual work.",
  "A versatile asset that fits seamlessly into both modern and classic design languages.",
  "Perfect for client presentations, offering a polished, professional look right out of the box."
];

const difficulties = ["Beginner", "Intermediate", "Advanced", "Pro"];
const statuses = ["Active", "Verified", "Active", "Active", "Needs Review"]; // Mostly active
const commercialUseOptions = ["Yes", "Yes", "No", "Unknown"];
const attributionOptions = ["No", "No", "Yes", "Unknown"];

resources = resources.map((r, i) => {
  return {
    ...r,
    longDescription: r.description + " " + descriptions[i % descriptions.length] + " It includes everything you need to get started quickly, featuring organized files and customizable layers.",
    difficulty: difficulties[i % difficulties.length],
    resourceType: r.category === 'Fonts' ? 'Font' : r.category === 'Mockups' ? 'Mockup' : r.category === 'UI Kits' ? 'UI Kit' : 'Asset',
    commercialUse: commercialUseOptions[i % commercialUseOptions.length],
    attributionRequired: attributionOptions[i % attributionOptions.length],
    fileSize: (Math.random() * 500 + 10).toFixed(1) + ' MB',
    numberOfFiles: Math.floor(Math.random() * 50) + 1,
    version: '1.' + (i % 5) + '.0',
    lastChecked: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    status: statuses[i % statuses.length],
    curationNote: r.isHandpicked ? "An absolute must-have for any serious designer. The attention to detail here is incredible." : undefined,
    limitations: i % 3 === 0 ? ["May require paid fonts", "Not compatible with older software versions"] : ["None identified"],
    pros: ["High resolution", "Well organized", "Easy to customize"],
    cons: i % 4 === 0 ? ["Large file size", "Steep learning curve"] : [],
    usageTips: ["Try adjusting the master components first", "Check the included documentation for setup instructions"]
  };
});

const newArrayStr = JSON.stringify(resources, null, 2);

const newContent = content.substring(0, content.indexOf('[', startIdx)) + newArrayStr + ';\n';
fs.writeFileSync('src/data.ts', newContent);
console.log('Successfully backfilled mock data');
