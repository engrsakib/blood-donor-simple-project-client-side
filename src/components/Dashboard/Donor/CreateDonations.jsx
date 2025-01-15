import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider";
import useGetAllUsers from "../user/AllUsers/useGetAllUsers";
import Loading from "../../Loading";
import axios from "axios";

const districtsWithUpazilas = {
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

const CreateDonations = () => {
  const { user } = useContext(AuthContext);
  const { users, refetch, isPending } = useGetAllUsers(user);

  const [formData, setFormData] = useState({
    recipientName: "",
    district: "",
    upazila: "",
    hospital: "",
    address: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

  const [filteredDistricts, setFilteredDistricts] = useState(
    Object.keys(districtsWithUpazilas)
  );

  if (isPending) return <Loading />;

  const isBlocked = users?.status === "blocked";

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: value,
        upazila: "", // Reset upazila when district changes
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDistrictSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setFilteredDistricts(
      Object.keys(districtsWithUpazilas).filter((district) =>
        district.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRequest = {
      ...formData,
      requesterName: users?.name || "Anonymous",
      email: users?.email,
      status: "pending", // Default status
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/donations",
        newRequest
      );

      if (response.data.insertedId) {
        Swal.fire(
          "Success!",
          "Your donation request has been submitted.",
          "success"
        );
        setFormData({
          recipientName: "",
          district: "",
          upazila: "",
          hospital: "",
          address: "",
          bloodGroup: "",
          donationDate: "",
          donationTime: "",
          requestMessage: "",
        });
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-base-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">
        Create Donation Request
      </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-4">
        {/* Requester Info */}
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Requester Name</span>
          </label>
          <input
            type="text"
            value={users?.name || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Requester Email</span>
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Recipient Info */}
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Recipient Name</span>
          </label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Recipient District</span>
          </label>

          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select District
            </option>
            {filteredDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Recipient Upazila</span>
          </label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select Upazila
            </option>
            {districtsWithUpazilas[formData.district]?.map((upazila) => (
              <option key={upazila} value={upazila}>
                {upazila}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital Info */}
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Hospital Name</span>
          </label>
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Address */}
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Full Address</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Blood Group */}
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Blood Group</span>
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        {/* Date and Time */}
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Donation Date</span>
          </label>
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div className="col-span-2 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Donation Time</span>
          </label>
          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            required
            className="input input-bordered w-full"
          />
        </div>

        {/* Message */}
        <div className="col-span-4 max-sm:col-span-4">
          <label className="label">
            <span className="label-text">Request Message</span>
          </label>
          <textarea
            name="requestMessage"
            value={formData.requestMessage}
            onChange={handleChange}
            required
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="col-span-4 max-sm:col-span-4">
          <button
            type="submit"
            className={`btn btn-primary w-full ${isBlocked && "btn-disabled"}`}
          >
            Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonations;
