<?php

include 'koneksi.php';

$nama   = $_POST['nama'];
$email  = $_POST['email'];
$pesan  = $_POST['pesan'];

$sql = "INSERT INTO pesan(nama,email,pesan)
        VALUES (?,?,?)";

$stmt = mysqli_prepare($conn, $sql);

mysqli_stmt_bind_param($stmt, "sss",
    $nama,
    $email,
    $pesan
);

if(mysqli_stmt_execute($stmt)){
    echo "<script>
            alert('Pesan berhasil dikirim!');
            window.location='index.html';
          </script>";
}else{
    echo "Gagal menyimpan data.";
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>