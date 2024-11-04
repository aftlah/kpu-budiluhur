import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';


const ExportPage = ({ options, voteCount }) => {
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(options.map((option, index) => ({
            Pasangan: `Pasangan ${index + 1}`,
            Ketua: option.ketua.name,
            'NIM Ketua': option.ketua.nim,
            'Wakil Ketua': option.wakil.name,
            'NIM Wakil Ketua': option.wakil.nim,
            Suara: index === 0 ? voteCount.option1 : voteCount.option2,
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Candidates');
        XLSX.writeFile(wb, 'candidates.xlsx');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Export to Excel</h1>
                <button onClick={exportToExcel} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Ekspor ke Excel
                </button>
            </div>
        </div>
    );
};

ExportPage.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        ketua: PropTypes.shape({
            name: PropTypes.string.isRequired,
            nim: PropTypes.string.isRequired,
        }).isRequired,
        wakil: PropTypes.shape({
            name: PropTypes.string.isRequired,
            nim: PropTypes.string.isRequired,
        }).isRequired,
    })).isRequired,
    voteCount: PropTypes.shape({
        option1: PropTypes.number.isRequired,
        option2: PropTypes.number.isRequired,
    }).isRequired,
};



export default ExportPage;