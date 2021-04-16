const {DNS} = require('@google-cloud/dns');
const dns = new DNS();

const callback = (err, records, nextQuery, apiResponse) => {
  if (!err) {
    // records is an array of Record objects.
  }

  if (nextQuery) {
    zone.getRecords(nextQuery, callback);
  }
};

const zone = dns.zone('ngdev');

zone.getRecords(callback);

//-
// Provide a query for further customization.
//-

// Get the namespace records for example.com.
const query = {
  name: 'ngdev.no.',
  type: 'NS'
};

zone.getRecords(query, callback);

//-
// If you only want records of a specific type or types, provide them in
// place of the query object.
//-
zone.getRecords('ns', (err, records) => {
  if (!err) {
    // records is an array of NS Record objects in your zone.
    console.log('NS RECORDS', records);
  }
});

//-
// You can also specify multiple record types.
//-
zone.getRecords(['ns', 'a', 'cname'], (err, records) => {
  if (!err) {
    // records is an array of NS, A, and CNAME records in your zone.
    console.log('OTHER RECORDS', records);
  }
});

//-
// If the callback is omitted, we'll return a Promise.
//-
zone.getRecords(query).then(data => {
  const records = data[0];
});