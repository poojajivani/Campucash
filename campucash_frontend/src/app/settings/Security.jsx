function Security() {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Security & Authentication</h1>

            <input type="password" className="border p-3 rounded-xl w-full" placeholder="New Password" />
            <input type="password" className="border p-3 rounded-xl w-full" placeholder="Confirm Password" />

            <button className="bg-primary text-white px-6 py-3 rounded-xl">
                Update Password
            </button>
        </div>
    );
}
export default Security;