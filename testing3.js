let fs = require('fs');
//let x = document.querySelector(".res");
let id = "4"; //document.querySelector(".Input1");
let id2= "8"; //document.querySelector(".Input2");
let idlist = new Set();
let m = new Map();

for (let i=0 ; i < 1 ; i++)
{
console.log(connect_users());
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


function update_map_values()
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


async function connect_users()
{
	fill_set();
	let idvalue=id.toString();
	let idvalue2=id2.toString();
    //γραψε κωδικα που θα διαβαζει απο το αρχειο usedIds.txt//
    if (!(idlist.has(idvalue))){
        //x.innerHTML = "ID " + id.value + " does not exist!";
    }
    else if (!(idlist.has(idvalue2))){
    	//x.innerHTML = "ID " + id.value2 + " does not exist!";
    }
    else{
       insert_users_to_map();
       for ([i,j] of m){
        if (idvalue===i[0]){
            if ((j[0][0]=="null")||(j[0][0]==null)){
            	m.set(i,[[idvalue2,"0.1"]]);
            	//x.innerHTML = "User with ID " + id.value + " removed!";
            	break;
            }
            else{
            	m.get(i).push([idvalue2,"0.1"]);
            	//x.innerHTML = "User with ID " + id.value + " removed!";
            	break;
            }
        }
       }
       for ([i,j] of m){
        if (idvalue2===i[0]){
            if ((j[0][0]=="null")||(j[0][0]==null)){
            	m.set(i,[[idvalue,"0.1"]]);
            	//x.innerHTML = "User with ID " + id.value + " removed!";
            	break;
            }
            else{
            	m.get(i).push([idvalue,"0.1"]);
            	//x.innerHTML = "User with ID " + id.value + " removed!";
            	break;
            }
        }
       }

	update_map_values();
}
}