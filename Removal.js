let fs = require('fs');
let x = document.querySelector(".res");
let id = document.querySelector(".Input1");
let idlist = new Set();
let m = new Map();


function fill_set() {
    // Έλεγχος αν το αρχείο υπάρχει
    if (!fs.existsSync("saved_ids.txt")) {
        //console.log("File does not exist. The Set remains unchanged.");
        return;
    }

    try {
        // Ανάγνωση περιεχομένων αρχείου
        let data = fs.readFileSync("saved_ids.txt", 'utf-8');

        // Διαχωρισμός των γραμμών και προσθήκη στο Set
        data
            .split('\n') // Διαχωρισμός των γραμμών
            .map(line => line.trim()) // Αφαίρεση κενών διαστημάτων από κάθε γραμμή
            .filter(line => line !== "") // Αφαίρεση κενών γραμμών
            .forEach(line => idlist.add(line)); // Προσθήκη κάθε γραμμής στο υπάρχον Set

        console.log("Lines added to idlist:", idlist);
    } catch (error) {
        //console.error("Error reading the file:", error);
    }
}


function insert_users_to_map()
{
    let arr=[];
    let data = fs.readFileSync('savedGraph.json'); // Read the file synchronously
    let obj = JSON.parse(data); // Parse the JSON data
    for ([i, j] of Object.entries(obj)) { //Μετατροπή από obj σε map
        arr = i.split(",");
        m.delete(i); // Remove the old key
        m.set(arr, j); // Set the new key as an arra
}
}

function remove_id()
{
    try {
        // Read the file contents synchronously
        let data = fs.readFileSync("saved_ids.txt", 'utf8');

        // Split the file contents into lines
        let lines = data.split('\n');

        // Filter out the lines containing the given value
        let updatedLines = lines.filter(line => !line.includes(idvalue));

        // Join the remaining lines back into a single string
        let updatedData = updatedLines.join('\n');

        // Write the updated content back to the file synchronously
        fs.writeFileSync("saved_ids.txt", updatedData, 'utf8');

        console.log(`Line has been removed.`);
    } catch (err) {
        console.error('Error processing the file:', err);
    }
}

function remove_map_key()
{
    try
    {

    let updatedObjects= Object.fromEntries(m);
        // Step 6: Write the updated objects back to the JSON file
        fs.writeFileSync("savedGraph.json", JSON.stringify(updatedObjects, null, 2), 'utf8');
        console.log('JSON file updated successfully!');
    } catch (err) {
        console.error('Error processing the file:', err);
    }
}

async function remove_person_ns() {
    fill_set();
    if (id.value.trim().length === 0) {
        x.innerHTML = "Please insert an ID..." + "\n";
    }
    idvalue=id.value.toString();
    if (!(idlist.has(idvalue))){
        x.innerHTML = "ID " + id.value + " does not exist!";
    }
    else{
        insert_users_to_map();
       for ([key] of m){
        if (idvalue===key[0]){
            m.delete(key);
            remove_id();
            remove_map_key();
            x.innerHTML = "User with ID " + id.value + " removed!";
        }
       }
    }
    id.value = "";
    }
  