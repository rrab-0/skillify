from flask import Flask, request, jsonify
import os
import tensorflow as tf
import pandas as pd
import numpy as np

app = Flask(__name__)

# {
#     "location": "Jakarta Utara", 
#     "career_level": "Supervisor/Koordinator", 
#     "experience_level": "2 tahun", 
#     "education_level": "Sarjana (S1)", 
#     "employment_type": "Penuh Waktu", 
#     "job_function": "Komputer/Teknologi Informasi,IT-Perangkat Lunak,Top Management / Manajemen Tingkat Atas", 
#     "company_industry": "Manufaktur/Produksi"
# }

@app.route('/predict', methods=['POST'])
def predict():
    # LOAD MODEl
    model = tf.keras.models.load_model('model/saved_model.h5')

    # GET REQUEST INPUT
    data = request.json
    # PREPROCESSING DATA
    df = pd.DataFrame(index=[0])
    locations = [
      'Aceh', 'Ambon', 'Asahan Kisaran', 'Badung', 'Balangan', 'Bali', 'Balikpapan', 'Bandar Lampung', 'Bandung',
      'Bangka', 'Bangka Belitung', 'Banjar', 'Banjarbaru', 'Banjarmasin', 'Banjarnegara', 'Banten', 'Bantul',
      'Banyuwangi', 'Barito Utara', 'Batam', 'Batu', 'Bekasi', 'Bengkulu', 'Bima', 'Binjai', 'Bintan', 'Bitung',
      'Blitar', 'Bogor', 'Bone', 'Bontang', 'Brebes', 'Bukittinggi', 'Bulungan', 'Cianjur', 'Cibinong', 'Cikarang',
      'Cikupa', 'Cilacap', 'Cilegon', 'Cileungsi', 'Cimahi', 'Cirebon', 'Citeureup', 'Demak', 'Denpasar', 'Depok',
      'Dumai', 'Gianyar', 'Gorontalo', 'Gowa', 'Gresik', 'Gunung Mas', 'Halmahera', 'Hulu Sungai Tengah',
      'Jakarta Barat', 'Jakarta Pusat', 'Jakarta Raya', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Utara', 'Jambi',
      'Jawa Barat', 'Jawa Tengah', 'Jawa Timur', 'Jayapura', 'Jember', 'Jepara', 'Kalimantan Barat',
      'Kalimantan Selatan', 'Kalimantan Tengah', 'Kalimantan Timur', 'Kalimantan Utara', 'Kapuas', 'Karangasem',
      'Karawang', 'Kediri', 'Kendari', 'Kepulauan Riau', 'Kepulauan Seribu', 'Ketapang', 'Klaten', 'Klungkung',
      'Kota Banda Aceh', 'Kotabaru', 'Kotawaringin Barat', 'Kotawaringin Timur', 'Kudus', 'Kulon Progo', 'Kupang',
      'Kuta', 'Kutai Barat', 'Kutai Kartanegara', 'Kutai Timur', 'Lampung', 'Lhokseumawe', 'Lombok', 'Madiun',
      'Madura', 'Magelang', 'Mahakam Ulu', 'Makassar', 'Malang', 'Malinau', 'Maluku', 'Maluku Barat', 'Maluku Utara',
      'Mamuju', 'Manado', 'Manokwari', 'Maros', 'Mataram', 'Medan', 'Merauke', 'Metro', 'Meulaboh', 'Minahasa',
      'Mojokerto', 'Muara Enim', 'Murung Raya', 'Nias', 'Nunukan', 'Nusa Tenggara Barat', 'Nusa Tenggara Timur',
      'Padang', 'Padang Sidempuan', 'Palangkaraya', 'Palembang', 'Palopo', 'Palu', 'Pandeglang', 'Pangandaran',
      'Pangkal Pinang', 'Papua', 'Papua Barat', 'Pare-Pare', 'Paser', 'Pasuruan', 'Pekalongan', 'Pekanbaru',
      'Pemalang', 'Pematangsiantar', 'Penajam Paser Utara', 'Ponorogo', 'Pontianak', 'Poso', 'Prabumulih',
      'Probolinggo', 'Purbalingga', 'Purwakarta', 'Purwokerto', 'Purworejo', 'Rangkasbitung', 'Riau', 'Salatiga',
      'Samarinda', 'Semarang', 'Seminyak', 'Serang', 'Sibolga', 'Sidoarjo', 'Singkawang', 'Sintang', 'Sleman',
      'Sorong', 'Sukabumi', 'Sulawesi Barat', 'Sulawesi Selatan', 'Sulawesi Tengah', 'Sulawesi Tenggara',
      'Sulawesi Utara', 'Sumatera Barat', 'Sumatera Selatan', 'Sumatera Utara', 'Sumbawa', 'Surabaya', 'Surakarta',
      'Tabalong', 'Tanah Bumbu', 'Tanah Laut', 'Tangerang', 'Tanjung Balai', 'Tanjung Pinang', 'Tapanuli', 'Tarakan',
      'Tasikmalaya', 'Tegal', 'Ternate', 'Timika', 'Tuban', 'Ubud', 'Ungaran', 'Wonogiri', 'Yogyakarta'
    ]
    # Create a dictionary to map locations to encoded values
    location_encoding = {location: i for i, location in enumerate(locations)}
    df["location"] = location_encoding[data['location']]

    career_levels = [
      'Manajer/Asisten Manajer', 'Supervisor/Koordinator',
      'Pegawai (non-manajemen & non-supervisor)',
      'Lulusan baru/Pengalaman kerja kurang dari 1 tahun',
      'CEO/GM/Direktur/Manajer Senior'
    ]
    # Create a dictionary to map career_levels to encoded values
    career_level_encoding = {career_level: i for i, career_level in enumerate(career_levels)}
    df["career_level"] = career_level_encoding[data['career_level']]

    experience_levels = [
      '5 tahun', '4 tahun', '2 tahun', '1 tahun', '3 tahun', '7 tahun',
      '6 tahun', '10 tahun', '8 tahun', '9 tahun', '15 tahun',
      '12 tahun', '14 tahun', '18 tahun', '20 tahun',
      'Lebih dari 20 Tahun', '11 tahun', '16 tahun', '17 tahun', '13 tahun'
    ]
    # Create a dictionary to map experience_levels to encoded values
    experience_level_encoding = {experience_level: i for i, experience_level in enumerate(experience_levels)}
    df["experience_level"] = experience_level_encoding[data['experience_level']]

    company_industries = [
      'Agrikultural/Perkebunan/Peternakan Unggas/Perikanan', 'Akunting / Audit / Layanan Pajak', 'Asuransi', 
      'Automobil/Mesin Tambahan Automotif/Kendaraan', 'Bahan Kimia/Pupuk/Pestisida', 'BioTeknologi/Farmasi/Riset klinik', 
      'Call Center/IT-Enabled Services/BPO', 'Elektrikal & Elektronik', 'Hiburan/Media', 'Hotel/Pariwisata', 'Hukum/Legal', 
      'Ilmu Pengetahuan & Teknologi', 'Industri Berat/Mesin/Peralatan', 'Jual Beli Saham/Sekuritas', 'Jurnalisme', 
      'Kayu/Fiber/Kertas', 'Keamanan/Penegak hukum', 'Kelautan/Aquakultur', 'Kesehatan/Medis', 
      'Komputer/Teknik Informatika (Perangkat Keras)', 'Komputer/Teknik Informatika (Perangkat Lunak)', 
      'Konstruksi/Bangunan/Teknik', 'Konsultasi (Bisnis & Manajemen)', 'Konsultasi (IT, Ilmu Pengetahuan, Teknis & Teknikal)', 
      'Lainnya', 'Layanan Umum/Tenaga Penggerak', 'Lingkungan/Kesehatan/Keamanan', 'Luar Angkasa/Aviasi/Pesawat Terbang', 
      'Makanan & Minuman/Katering/Restoran', 'Manajemen/Konsulting HR', 'Manufaktur/Produksi', 'Minyak/Gas/Petroleum', 'Olahraga', 
      'Organisasi Nirlaba/Pelayanan Sosial/LSM', 'Pakaian', 'Pameran/Manajemen acara/PIKP', 'Pelayanan Arsitek/Desain Interior', 
      'Pelayanan Perbaikan & Pemeliharaan', 'Pemerintahan/Pertahanan', 'Pendidikan', 'Perawatan/Kecantikan/Fitnes', 
      'Perbankan/Pelayanan Keuangan', 'Percetakan/Penerbitan', 'Periklanan/Marketing/Promosi/Hubungan Masyarakat',
      'Permata/Perhiasan', 'Pertambangan', 'Polymer/Plastik/Karet/Ban', 'Produk Konsumen/Barang konsumen yang bergerak cepat', 
      'Properti/Real Estate', 'R&D', 'Retail/Merchandise', 'Seni/Desain/Fashion', 'Tekstil/Garment', 'Telekomunikasi', 
      'Tembakau', 'Transportasi/Logistik', 'Travel/Pariwisata', 'Umum & Grosir'
    ]
    # Create a dictionary to company_industries to encoded values
    company_industry_encoding = {company_industry: i for i, company_industry in enumerate(company_industries)}
    df["company_industry"] = company_industry_encoding[data['company_industry']]

    employment_types = [
        'Kontrak',	'Paruh Waktu',	'Penuh Waktu',	'Temporer'
    ]
    # Perform one-hot encoding
    encoded_employment_types = [1 if level in data['employment_type'] else 0 for level in employment_types]
    for level, encoded_value in zip(employment_types, encoded_employment_types):
        df[level] = encoded_value

    education_levels = [
        'D3 (Diploma)', 'D4 (Diploma)', 'Diploma Pascasarjana', 'Doktor (S3)', 'Gelar Professional', 'Magister (S2)', 'SMA',
        'SMU/SMK/STM', 'Sarjana (S1)', 'Sertifikat Professional', 'Tidak terspesifikasi'
    ]
    # Perform one-hot encoding
    encoded_education = [1 if level in data['education_level'] else 0 for level in education_levels]
    for level, encoded_value in zip(education_levels, encoded_education):
        df[level] = encoded_value

    job_functions = [
        'Aktuaria/Statistik', 'Akuntansi / Keuangan', 'Akuntansi Umum / Pembiayaan', 'Angkatan Bersenjata',
        'Arsitek/Desain Interior', 'Audit & Pajak', 'Bangunan/Konstruksi', 'Biomedis', 'Bioteknologi', 'Diagnosa/Lainnya',
        'Digital Marketing', 'E-commerce', 'Farmasi', 'Geologi/Geofisika', 'Hiburan', 'Hotel/Pariwisata', 'Hotel/Restoran',
        'Hubungan Masyarakat', 'IT-Admin Jaringan/Sistem/Database', 'IT-Perangkat Keras', 'IT-Perangkat Lunak', 'Jurnalis/Editor',
        'Keuangan / Investasi Perusahaan', 'Kimia', 'Komputer/Teknologi Informasi', 'Kontrol Proses', 'Lainnya',
        'Lainnya/Kategori tidak tersedia', 'Layanan Kesehatan', 'Layanan Pelanggan', 'Layanan Sosial/Konseling',
        'Logistik/Rantai Pasokan', 'Makanan/Minuman/Pelayanan Restoran', 'Manufaktur', 'Mekanikal', 'Merchandising', 'Minyak/Gas',
        'Pekerjaan Umum', 'Pelatihan & Pengembangan', 'Pelayanan', 'Pemasaran/Pengembangan Bisnis', 'Pembelian/Manajemen Material',
        'Pemeliharaan', 'Pendidikan', 'Pendidikan/Pelatihan', 'Penerbangan', 'Penerbitan', 'Pengacara / Asisten Legal',
        'Penjaminan Kualitas / QA', 'Penjualan - Jasa Keuangan', 'Penjualan - Korporasi', 'Penjualan - Teknik/Teknikal/IT',
        'Penjualan / Pemasaran', 'Penjualan Ritel', 'Perawatan Pribadi', 'Perbankan / Jasa Finansial', 'Periklanan',
        'Pertanian', 'Praktisi/Asisten Medis', 'Properti/Real Estate', 'Sains',
        'Sains & Teknologi', 'Sekretaris', 'Seni / Desain Kreatif', 'Seni/Media/Komunikasi', 'Staf / Administrasi umum',
        'Sumber Daya Manusia / HR', 'Sumber Daya Manusia/Personalia', 'Survei Kuantitas', 'Teknik', 'Teknik Elektro',
        'Teknik Elektronika', 'Teknik Industri', 'Teknik Kimia', 'Teknik Lainnya', 'Teknik Lingkungan', 'Teknik Sipil/Konstruksi Bangunan',
        'Teknikal & Bantuan Pelanggan', 'Teknologi Makanan/Ahli Gizi', 'Telesales/Telemarketing', 'Top Management / Manajemen Tingkat Atas'
    ]
    # Perform one-hot encoding
    encoded_job_function = [1 if level in data['job_function'] else 0 for level in job_functions]
    for level, encoded_value in zip(job_functions, encoded_job_function):
        df[level] = encoded_value

    # SCALLING
    MAX_LOCATION = 193
    MAX_CAREER_LEVEL = 4
    MAX_EXPERIENCE_LEVEL = 19
    MAX_COMPANY_INDUSTRY = 57

    df['location'] = df['location'] / MAX_LOCATION
    df['career_level'] = df['career_level'] / MAX_CAREER_LEVEL
    df['experience_level'] = df['experience_level'] / MAX_EXPERIENCE_LEVEL
    df['company_industry'] = df['company_industry'] / MAX_COMPANY_INDUSTRY

    # PREDICTION
    data = pd.read_csv("dataset/data_cleaned.csv")

    NUM_PREDICTION = 10
    recommendations = model.predict(df.values)[0]
    sorted_indices = np.argsort(recommendations)[::-1]  # Sort indices in descending order
    recommended_jobs = data['id'][sorted_indices][:NUM_PREDICTION]  # Get top 10 recommended job IDs

    matched_rows = data[data['id'].isin(recommended_jobs.tolist())]

    # RETURN PREDICTION
    response = matched_rows.to_json(orient='records')
    return response

@app.route("/")
def hello_world():
    return "<p>service is up and running.</p>"

if __name__ == '__main__':
    # app.run(debug=True)
    # app.run(host="0.0.0.0", port=8080)
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
