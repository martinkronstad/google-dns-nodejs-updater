const { DNS } = require('@google-cloud/dns');
const dns = new DNS();
const zone = dns.zone(process.env.ZONE_ID);

exports.changeIp = async (req, res) => {
  const newIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log('Current remote ip', newIp);
  const recordToChange = req.query.record;
  const key = req.query.key;

  if (recordToChange !== undefined && recordToChange !== null &&
    key !== undefined && key === process.env.KEY) {
    try {
      const records = await zone.getRecords('a');
      records[0].forEach(async (record) => {
        if (record.name === recordToChange) {

          const newARecord = zone.record('a', {
            name: recordToChange,
            data: newIp,
            ttl: 300
          });

          const changes = {
            add: newARecord,
            delete: record
          };

          const [change, apiResponse] = await zone.createChange(changes);
        }
      });
    } catch (ex) {
      console.log('Error while trying to make changes', ex);
      res.status(500).send(ex);
    } finally {
      res.send({ success: true });
      console.log('Success');
    }
  } else {
    console.log('User tried to change record with wrong record info or key', key, recordToChange, process.env.KEY);
    res.status(500).send({ success: false });
  }
}