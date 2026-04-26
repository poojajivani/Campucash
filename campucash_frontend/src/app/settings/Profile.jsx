function Profile() {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Personal Profile</h1>

            <input className="border p-3 rounded-xl w-full" placeholder="Full Name" />
            <input className="border p-3 rounded-xl w-full" placeholder="Role" />

            <button className="bg-primary text-white px-6 py-3 rounded-xl">
                Save Changes
            </button>
        </div>
    );
}
export default Profile;