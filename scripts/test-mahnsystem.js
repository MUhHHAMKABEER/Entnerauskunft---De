const fetch = require('node-fetch');

async function testMahnsystem() {
  console.log('\n=== Teste Mahnsystem ===\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/admin/reminders/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    console.log('Ergebnis:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.error('Fehler:', error.message);
  }
  
  console.log('\n===================\n');
}

testMahnsystem();
