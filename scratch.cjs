const fs = require('fs');

const layoutCode = fs.readFileSync('src/layouts/GreatHallLayout.tsx', 'utf8');
let dataCode = fs.readFileSync('src/data/greatHallData.ts', 'utf8');

// Extract everything from export type GreatHallAccess to export const greatHallConversations: GreatHallConversation[] = [ ... ];
const accessRegex = /export type GreatHallAccess[\s\S]*?(?=export const PLAN_ORDER)/;
const dataRegex = /export const ago =[\s\S]*?(?=export const hasGreatHallAccess)/;
const roomsRegex = /export const greatHallRooms[\s\S]*?(?=export const hasGreatHallAccess|export const roleClassName)/; // It's at the end
// Actually, it's easier to just match from export const greatHallRooms to the end of the data we need.

// Let's just grab the whole block of types from Layout
const typesMatch = layoutCode.match(/(export type GreatHallAccess[\s\S]*?)(?=const PLAN_ORDER)/);
const roomsMatch = layoutCode.match(/(export const greatHallRooms:[\s\S]*?\];)/);
const groupsMatch = layoutCode.match(/(export const greatHallGroups:[\s\S]*?\];)/);
const msgsMatch = layoutCode.match(/(export const greatHallRoomMessages:[\s\S]*?\};)/);
const convMatch = layoutCode.match(/(export const conversationIdForMember[\s\S]*?\];)/);

const typesCode = typesMatch ? typesMatch[1] : '';
let roomsCode = roomsMatch ? roomsMatch[1] : '';
const groupsCode = groupsMatch ? groupsMatch[1] : '';
const msgsCode = msgsMatch ? msgsMatch[1] : '';
const convCode = convMatch ? convMatch[1] : '';

// Convert groups into rooms
let newRooms = '';
if (groupsCode) {
    const groupsList = groupsCode.match(/\{[\s\S]*?\}/g);
    if (groupsList) {
        newRooms = groupsList.map(g => {
            return g.replace('access:', 'access:')
             .replace('about:', 'about:');
        }).join(',\n  ');
    }
}
if (newRooms) {
    roomsCode = roomsCode.replace('];', '  ' + newRooms + '\n];');
}

dataCode = dataCode.replace('// Models for Great Hall V2\n', '// Models for Great Hall V2\n\n' + typesCode);

// Append the data
dataCode += '\n\n' + 'const ago = (hours: number, minutes = 0) => new Date(Date.now() - ((hours * 60) + minutes) * 60 * 1000).toISOString();\n\n' + roomsCode + '\n\n' + msgsCode + '\n\n' + convCode + '\n';

fs.writeFileSync('src/data/greatHallData.ts', dataCode);

// Now remove them from GreatHallLayout.tsx
let newLayoutCode = layoutCode.replace(typesMatch[1], '');
newLayoutCode = newLayoutCode.replace(roomsMatch[1], '');
newLayoutCode = newLayoutCode.replace(groupsMatch[1], '');
newLayoutCode = newLayoutCode.replace(msgsMatch[1], '');
newLayoutCode = newLayoutCode.replace(convMatch[1], '');
newLayoutCode = newLayoutCode.replace(/const ago =[\s\S]*?(?=export const hasGreatHallAccess)/, '');

fs.writeFileSync('src/layouts/GreatHallLayout.tsx', newLayoutCode);
