let fs = require('fs');
//let x = 
let id = "10";//document.querySelector(".Input1");
let idlist = new Set();
let m = new Map();

for (let i=0 ; i < 1 ; i++)
{
console.log(remove_person_ns());
}

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

function remove_id() {

    try {
        // Read the file contents synchronously
        let data = fs.readFileSync("saved_ids.txt", 'utf8');

        // Split the file contents into lines
        let lines = data.split('\n');

        // Filter out lines where the trimmed line matches the exact idvalue
        let updatedLines = lines.filter(line => line.trim() !== idvalue);

        // Join the remaining lines back into a single string
        let updatedData = updatedLines.join('\n');

        // Write the updated content back to the file synchronously
        fs.writeFileSync("saved_ids.txt", updatedData, 'utf8');

        console.log(`Line with ID "${idvalue}" has been removed.`);
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
    let temp=[];
    let temp2=[];
    let pairs;
    idvalue=id.toString();
    fill_set();
    //γραψε κωδικα που θα διαβαζει απο το αρχειο usedIds.txt//
    if (!(idlist.has(idvalue))){
        //x.innerHTML = "ID " + id.value + " does not exist!";
    }
    else{
        insert_users_to_map();
        for([i,j] of m)
        {
            console.log(i);
            console.log(j);
        }
       for ([i] of m){
        if (idvalue===i[0]){
            m.delete(i); //Διαγραφη ΜΟΝΟ του id//
            //x.innerHTML = "User with ID " + id.value + " removed!";
            console.log("mpike");
        }
       }
               for([i,j] of m)
        {
            console.log(i);
            console.log(j);
        }
       for ([i,j] of m) {
        temp = j.flat();
    if (temp.includes(idvalue))
    { 
     temp2 = temp.toSpliced(temp.indexOf(idvalue),2);   
        pairs = temp2.reduce((acc, val, index) => {
        if (index % 2 === 0) {
            acc.push([val]);
        } else {
            acc[acc.length - 1].push(val);
        }
        return acc;
    }, []);
        console.log(m);
    m.set(i, pairs);
}
}
    //test//
    for ([i,j] of m)
    {
        if (j[0]==null)
        {
            m.set(i,[[]]);
        }
    }
    remove_id();
    remove_map_key();
    }
    //id.value = "";
    }