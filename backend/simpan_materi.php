<?php
    include 'koneksi.php';

    $judul = $_POST['judul'];
    $deskripsi = $_POST['deskripsi'];
    $linkVideo = $_POST['linkVideo'];
    $namaModul = $_POST['namaModul'] ?? null;
    $namaPpt = $_POST['namaPpt'] ?? null;
    $namaTugas = $_POST['namaTugas'] ?? null;
    $namaGambar = $_POST['namaGambar'] ?? null;

    $sql = "INSERT INTO materi (judul, deskripsi, link_video, nama_modul, nama_ppt, nama_tugas, nama_gambar)
            VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssssss", $judul, $deskripsi, $linkVideo, $namaModul, $namaPpt, $namaTugas, $namaGambar);

    if ($stmt->execute()) {
    echo "Materi berhasil disimpan!";
    } else {
    echo "Gagal: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
?>
