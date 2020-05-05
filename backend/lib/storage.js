import uid from 'uid';

export function createPosting(posting){

}

export function readPosting(id){

}

export function updatePosting(id, posting){

}

export function deletePosting(id){

}


/*

export async function storeToDB(postings) {

    // 1. get the journal
    let journal = db
    .get('journal')
    .value();
    console.log(journal);

    const newJournal = [journal, ...postings];
    console.log(newJournal);

    db.set('journal', newJournal).write();

    // console.info('SCRAPING THE BARREL! 🛢🥄');
    journal.forEach(posting => {
        // const year = posting.entryDate.getFullYear();

        

        // console.log(journal);
        // Do something to your user's inventory
        //journal.push(posting);

        //db.get('years').push({ year: year, postings: []}).write();
        //console.log(getDateFromString(posting.buchungstag).getFullYear())
    });
    //db.get('twitter').push({ date: Date.now(), count: tCount }).write();
    //db.get('instagram').push({ date: Date.now(), count: iCount }).write();
}
*/