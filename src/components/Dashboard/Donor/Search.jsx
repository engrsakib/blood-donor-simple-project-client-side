import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useGetAllUsers from "../user/AllUsers/useGetAllUsers";
import { AuthContext } from "../../../provider/AuthProvider";

const districtUpazilas = {
  Magura: ["Magura Sadar", "Shalikha", "Sreepur", "Mohammadpur"],
  Bandarban: ["Rowangchhari", "Ruma", "Thanchi", "Alikadam", "Lama", "Sadar"],
  Barguna: ["Patharghata", "Amtali", "Betagi", "Bamna", "Sadar"],
  Barisal: [
    "Banaripara",
    "Babuganj",
    "Muladi",
    "Mehendiganj",
    "Wazirpur",
    "Agailjhara",
    "Gouranadi",
    "Sadar",
  ],
  Bhola: [
    "Charfasson",
    "Monpura",
    "Daulatkhan",
    "Lalmohan",
    "Borhanuddin",
    "Sadar",
  ],
  Bogura: [
    "Adamdighi",
    "Sherpur",
    "Dhupchanchia",
    "Shibganj",
    "Nandigram",
    "Kahaloo",
    "Sonatala",
    "Sariakandi",
    "Gabtali",
    "Sadar",
  ],
  Chittagong: [
    "Patiya",
    "Sitakunda",
    "Boalkhali",
    "Hathazari",
    "Rangunia",
    "Anwara",
    "Lohagara",
    "Sandwip",
    "Fatikchhari",
    "Sadar",
  ],
  Chuadanga: ["Alamdanga", "Damurhuda", "Jibannagar", "Sadar"],
  Comilla: ["Daudkandi", "Muradnagar", "Homna", "Meghna", "Debidwar", "Sadar"],
  "Cox's Bazar": [
    "Chakaria",
    "Ramu",
    "Maheshkhali",
    "Pekua",
    "Teknaf",
    "Ukhia",
    "Sadar",
  ],
  Dhaka: [
    "Dhanmondi",
    "Gulshan",
    "Mohammadpur",
    "Uttara",
    "Mirpur",
    "Keraniganj",
    "Tejgaon",
    "Savar",
    "Sadar",
  ],
  Dinajpur: [
    "Birganj",
    "Birampur",
    "Parbatipur",
    "Chirirbandar",
    "Kaharole",
    "Nawabganj",
    "Bochaganj",
    "Phulbari",
    "Hakimpur",
    "Sadar",
  ],
  Faridpur: [
    "Boalmari",
    "Madhukhali",
    "Alfadanga",
    "Nagarkanda",
    "Bhanga",
    "Saltha",
    "Charbhadrasan",
    "Sadar",
  ],
  Feni: ["Parshuram", "Fulgazi", "Chhagalnaiya", "Daganbhuiyan", "Sadar"],
  Gaibandha: [
    "Gobindaganj",
    "Sundarganj",
    "Saghata",
    "Palashbari",
    "Sadullapur",
    "Phulchhari",
    "Sadar",
  ],
  Gazipur: ["Tongi", "Kaliakair", "Kapasia", "Sreepur", "Kaliganj", "Sadar"],
  Habiganj: [
    "Nabiganj",
    "Bahubal",
    "Chunarughat",
    "Ajmiriganj",
    "Baniachong",
    "Lakhai",
    "Sadar",
  ],
  Jamalpur: [
    "Islampur",
    "Sarishabari",
    "Madarganj",
    "Dewanganj",
    "Baksiganj",
    "Sadar",
  ],
  Jessore: [
    "Jhikargachha",
    "Manirampur",
    "Bagherpara",
    "Chougachha",
    "Keshabpur",
    "Sadar",
  ],
  Jhenaidah: ["Maheshpur", "Kotchandpur", "Shailkupa", "Harinakunda", "Sadar"],
  Khagrachari: [
    "Ramgarh",
    "Mahalchhari",
    "Panchhari",
    "Manikchhari",
    "Dighinala",
    "Sadar",
  ],
  Khulna: ["Batiaghata", "Dacope", "Koyra", "Paikgachha", "Terokhada", "Sadar"],
  Kishoreganj: [
    "Bhairab",
    "Itna",
    "Katiadi",
    "Karimganj",
    "Nikli",
    "Pakundia",
    "Mithamain",
    "Austagram",
    "Sadar",
  ],
  Kurigram: [
    "Nageshwari",
    "Bhurungamari",
    "Phulbari",
    "Ulipur",
    "Rajarhat",
    "Chilmari",
    "Rowmari",
    "Char Rajibpur",
    "Sadar",
  ],
  Lakshmipur: ["Raipur", "Ramganj", "Ramgati", "Kamalnagar", "Sadar"],
  Lalmonirhat: ["Aditmari", "Kaliganj", "Hatibandha", "Patgram", "Sadar"],
  Moulvibazar: [
    "Kamalganj",
    "Rajnagar",
    "Kulaura",
    "Barlekha",
    "Sreemangal",
    "Juri",
    "Sadar",
  ],
  Munshiganj: [
    "Lohajang",
    "Sreenagar",
    "Sirajdikhan",
    "Gazaria",
    "Tongibari",
    "Sadar",
  ],
  Mymensingh: [
    "Bhaluka",
    "Gafargaon",
    "Haluaghat",
    "Nandail",
    "Trishal",
    "Ishwarganj",
    "Dhobaura",
    "Muktagacha",
    "Sadar",
  ],
  Narayanganj: [
    "Rupganj",
    "Araihazar",
    "Sonargaon",
    "Bandar",
    "Siddhirganj",
    "Sadar",
  ],
  Narsingdi: ["Raipura", "Shibpur", "Palash", "Monohardi", "Belabo", "Sadar"],
  Natore: ["Bagatipara", "Lalpur", "Gurudaspur", "Singra", "Naldanga", "Sadar"],
  Noakhali: [
    "Companiganj",
    "Begumganj",
    "Hatiya",
    "Senbagh",
    "Subarnachar",
    "Sadar",
  ],
  Pabna: ["Santhia", "Ishwardi", "Chatmohar", "Faridpur", "Sadar"],
  Panchagarh: ["Tetulia", "Debiganj", "Boda", "Atwari", "Sadar"],
  Patuakhali: [
    "Bauphal",
    "Dashmina",
    "Kalapara",
    "Mirzaganj",
    "Dumki",
    "Galachipa",
    "Sadar",
  ],
  Rajshahi: [
    "Godagari",
    "Bagha",
    "Tanore",
    "Puthia",
    "Durgapur",
    "Charghat",
    "Bagmara",
    "Sadar",
  ],
  Rangamati: [
    "Baghaichhari",
    "Barkal",
    "Langadu",
    "Rajasthali",
    "Kaptai",
    "Juraichhari",
    "Sadar",
  ],
  Satkhira: ["Kaliganj", "Shyamnagar", "Assasuni", "Tala", "Debhata", "Sadar"],
  Sherpur: ["Nakla", "Nalitabari", "Jhenaigati", "Sreebardi", "Sadar"],
  Sirajganj: [
    "Ullapara",
    "Kazipur",
    "Shahjadpur",
    "Tarash",
    "Belkuchi",
    "Raiganj",
    "Chauhali",
    "Kamarkhanda",
    "Sadar",
  ],
  Sunamganj: [
    "Dharampasha",
    "Tahirpur",
    "Jamalganj",
    "Jagannathpur",
    "Chhatak",
    "Dowarabazar",
    "Sulla",
    "Sadar",
  ],
  Sylhet: [
    "Beanibazar",
    "Zakiganj",
    "Jaintiapur",
    "Golapganj",
    "Osmani Nagar",
    "Sadar",
  ],
  Tangail: [
    "Madhupur",
    "Sakhipur",
    "Gopalpur",
    "Basail",
    "Mirzapur",
    "Nagarpur",
    "Kalihati",
    "Sadar",
  ],
  Thakurgaon: ["Ranisankail", "Baliadangi", "Pirganj", "Haripur", "Sadar"],
};

const districts = Object.keys(districtUpazilas);
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const Search = () => {
  const { user } = useContext(AuthContext);
  const { users } = useGetAllUsers(user);

  const navigate = useNavigate();

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState(false);

  const {
    isLoading: isPending,
    data: response = {},
    refetch,
  } = useQuery({
    queryKey: [
      "donations-key-search",
      selectedDistrict,
      selectedUpazila,
      selectedBloodGroup,
      currentPage,
    ],
    
    queryFn: async () => {
      const response = await axios.post(
        `https://blood-donation-server-liard.vercel.app/all-donations/filter`,
        {
          bloodGroup: selectedBloodGroup,
          district: selectedDistrict,
          upazila: selectedUpazila,
        }
      );
      return response.data;
    },
  });

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    setSelectedUpazila("");
  };

  const handleSearch = () => {
    setSearchQuery(true);
    setCurrentPage(1);
    if (selectedDistrict || selectedBloodGroup || selectedUpazila) {
      refetch();
    }
  };

  if (isPending) return <Loading />;

  const { donations = [], totalPages = 1 } = response;

  return (
    <>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className="min-h-screen w-full ml-3 p-4 mx-auto rounded-lg shadow-md flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-center mb-6">
            All Donation Requests ({response.length})
          </h1>

          <div className="flex flex-row justify-end items-center mb-4 gap-4">
            {/* জেলা সিলেক্ট */}
            <select
              className="select select-bordered w-40"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            {/* উপজেলা সিলেক্ট */}
            <select
              className="select select-bordered w-40"
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrict}
            >
              <option value="">Select Upazila</option>
              {selectedDistrict &&
                districtUpazilas[selectedDistrict].map((upazila) => (
                  <option key={upazila} value={upazila}>
                    {upazila}
                  </option>
                ))}
            </select>

            {/* ব্লাড গ্রুপ সিলেক্ট */}
            <select
              className="select select-bordered w-40"
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>

            {/* সার্চ বাটন */}
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>

          {response.length ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Blood Group</th>
                    <th>Mail</th>
                    <th>District</th>
                    <th>Upazila</th>
                  </tr>
                </thead>
                <tbody>
                  {response.map((donation, index) => (
                    <tr key={donation._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>
                        <img
                          className="w-20 h-20 rounded-full object-cover"
                          src={donation?.photoUrl}
                          alt=""
                        />
                      </td>
                      <td>{donation?.name}</td>
                      <td>{donation?.bloodGroup}</td>
                      <td>{donation?.email}</td>
                      <td>{donation?.district}</td>
                      <td>{donation?.upazila}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/J5R5d7X/flat-design-no-data-illustration-23-2150527139.jpg"
                alt="response"
                className="w-2/4 object-cover mx-auto"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center mt-4 sticky bottom-0 bg-base-200 py-4">
          <div className="btn-group">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`btn ${page === currentPage ? "btn-active" : ""}`}
                onClick={() => {
                  setCurrentPage(page);
                  refetch();
                }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
