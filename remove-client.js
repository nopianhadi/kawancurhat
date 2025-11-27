// Script untuk menghapus YAYASAN MELATI INDOPRIMA dari localStorage
// Jalankan di browser console (F12 > Console)

// Ambil data clients dari localStorage
const clientsData = localStorage.getItem('admin_clients_data');

if (clientsData) {
  const clients = JSON.parse(clientsData);
  
  // Filter untuk menghapus YAYASAN MELATI INDOPRIMA
  const filteredClients = clients.filter(client => 
    !client.perusahaan.includes('YAYASAN MELATI INDOPRIMA')
  );
  
  // Update nomor urut
  const reorderedClients = filteredClients.map((client, index) => ({
    ...client,
    no: index + 1
  }));
  
  // Simpan kembali ke localStorage
  localStorage.setItem('admin_clients_data', JSON.stringify(reorderedClients));
  
  console.log('✅ YAYASAN MELATI INDOPRIMA berhasil dihapus!');
  console.log('Refresh halaman untuk melihat perubahan');
  
  // Auto refresh
  setTimeout(() => {
    window.location.reload();
  }, 1000);
} else {
  console.log('❌ Data clients tidak ditemukan di localStorage');
}
