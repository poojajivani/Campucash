function Notifications() {
    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Notifications</h1>

            <label className="flex gap-3">
                <input type="checkbox" /> Email Alerts
            </label>

            <label className="flex gap-3">
                <input type="checkbox" /> SMS Alerts
            </label>
        </div>
    );
}
export default Notifications;