import React, { useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useGetAllUsers from "./AllUsers/useGetAllUsers";
import Loading from "../../Loading";

const districtData = {
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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const UserEdit = () => {
  const { user, dark, setLoadding } = useContext(AuthContext);
  const navigate = useNavigate();

  const { users, refetch, isPending } = useGetAllUsers(user);

  if (isPending) {
    <Loading></Loading>;
  }
  refetch();

  // Form state
  const [formData, setFormData] = useState({
    name: users.name,
    photoUrl: users.photoUrl,
    bloodGroup: users.bloodGroup || "",
    district: users.district || "",
    upazila: users.upazila || "",
    email: users.email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData({ ...formData, district, upazila: "" }); // Clear upazila when district changes
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to save the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `https://blood-donation-server-liard.vercel.app/users/update/${users.email}`,
            formData
          )
          .then((response) => {
            Swal.fire(
              "Saved!",
              "Your profile has been updated successfully.",
              "success"
            );
            navigate("/dashboard/profile");
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
            Swal.fire(
              "Error!",
              "Failed to update profile. Try again.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div
      className={`p-4 sm:p-6 lg:p-8 ${
        dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="card shadow-xl p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Edit Profile</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm text-gray-500">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">email</label>
            <input
              type="mail"
              readOnly
              name="last"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Photo URL</label>
            <input
              type="text"
              name="photoUrl"
              value={formData.photoUrl}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500">Blood Group</label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select your blood group
              </option>
              {bloodGroups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleDistrictChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select your district
              </option>
              {Object.keys(districtData).map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-500">Upazila</label>
            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
              disabled={!formData.district}
            >
              <option value="" disabled>
                Select your upazila
              </option>
              {formData.district &&
                districtData[formData.district].map((upazila) => (
                  <option key={upazila} value={upazila}>
                    {upazila}
                  </option>
                ))}
            </select>
          </div>

          <div className="sm:col-span-2 flex justify-end">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;
