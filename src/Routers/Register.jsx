import React, { useContext, useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import Google from "../components/Google";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

// District and Upazila Data (same as before)
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

const Register = () => {
  const { crateMailPassword, user, setUser, loading, setLoading, dark } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    status: "active",
    role: "donor",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [districts] = useState(Object.keys(districtUpazilas)); // District list
  const [upazilas, setUpazilas] = useState([]); // Upazilas based on selected district
  const [avatar, setAvatar] = useState(null); // Avatar file
  const [imageError, setImageError] = useState(""); // Image error message
  const [imagePreview, setImagePreview] = useState(null); // Image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "district") {
      setUpazilas(districtUpazilas[value] || []);
      setFormData((prev) => ({ ...prev, upazila: "" }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image file (max size 500KB, JPG/PNG only)
      if (file.size > 500000) {
        setImageError("Image size should not exceed 500KB.");
        setAvatar(null);
        setImagePreview(null);
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setImageError("Only JPG and PNG formats are allowed.");
        setAvatar(null);
        setImagePreview(null);
        return;
      }

      setImageError(""); // Clear image error
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setPasswordError(
        "Password must be at least 6 characters long, with one uppercase and one lowercase."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError(""); // Clear password error

    try {
      let photoUrl = "";

      if (avatar) {
        const formDataImg = new FormData();
        formDataImg.append("image", avatar);

        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`,
          formDataImg
        );
        photoUrl = res.data.data.display_url;
      }

      // Create user using email and password
      crateMailPassword(formData.email, formData.password)
        .then((userCredential) => {
          const dataToSend = {
            ...formData,
            photoUrl,
            password: undefined,
            confirmPassword: undefined,
          };

          // Save user data to database
          axios
            .post(
              "https://blood-donation-server-liard.vercel.app/users",
              dataToSend
            )
            .then(() => {
              Swal.fire(
                "Success!",
                "Registration completed successfully.",
                "success"
              );
              navigate("/");
            })
            .catch((error) => {
              console.error("Error saving data to database:", error);
              toast.error("Failed to save data. Please try again.");
            });
        })
        .catch((error) => {
          console.error("Error during user creation:", error);
          toast.error("Registration failed. Please try again.");
        });
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div
        className={`${
          dark ? "border border-yellow-300" : "bg-white"
        } p-8 rounded-lg shadow-md max-w-md w-full`}
      >
        <h2
          className={`text-center text-xl font-bold mb-6 ${
            dark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Avatar */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="file-input file-input-bordered w-full"
            />
            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Avatar Preview"
                className="mt-2 w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>

          {/* Blood Group */}
          <div className="mb-4">
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>

          {/* District */}
          <div className="mb-4">
            <Select
              options={districts.map((district) => ({
                value: district,
                label: district,
              }))}
              onChange={(selected) =>
                handleChange({
                  target: { name: "district", value: selected.value },
                })
              }
              placeholder="Select District"
              className="w-full"
            />
          </div>

          {/* Upazila */}
          <div className="mb-4">
            <select
              name="upazila"
              value={formData.upazila}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            >
              <option value="">Select Upazila</option>
              {upazilas.map((upazila) => (
                <option key={upazila} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input input-bordered w-full"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        {/* <div className="mt-4 text-center">
          <Google />
        </div> */}

        <p className="mt-4 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
