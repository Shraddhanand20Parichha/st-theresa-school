
export default function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-2">CBSE Vault</h3>
        <p className="text-sm text-gray-500 mb-4">Manage mandatory disclosure documents according to CBSE guidelines.</p>
        <a href="/admin/dashboard/cbse-vault" className="text-primary font-medium hover:underline text-sm">Manage Documents &rarr;</a>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Media Manager</h3>
        <p className="text-sm text-gray-500 mb-4">Update homepage slider posters from Canva and edit the scrolling news ticker.</p>
        <a href="/admin/dashboard/media" className="text-primary font-medium hover:underline text-sm">Manage Ext &rarr;</a>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Quick Links</h3>
        <p className="text-sm text-gray-500 mb-4">Update important links like Admission Forms and Fee Structures.</p>
        <a href="#" className="text-primary font-medium hover:underline text-sm">Manage Links &rarr;</a>
      </div>
    </div>
  );
}
