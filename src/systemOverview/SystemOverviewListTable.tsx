import React from 'react';
import './SystemOverviewStyle.scss';
interface SystemOverviewListTableProps {
    data: any;
}

const data = [
    { Community: "Anom", CommunitySystemStatus: 19, MaintenanceStatus: "Due", DiagnosticStatus: "Resolved", CheckedBy: "Clovis", LastUpdate: "Male"  },
    { Community: "Megha", CommunitySystemStatus: 19, MaintenanceStatus: "Completed", DiagnosticStatus: "Pending", CheckedBy: "Bube", LastUpdate: "Male"  },
    { Community: "Subham", CommunitySystemStatus: 25, MaintenanceStatus: "Completed", DiagnosticStatus: "Pending", CheckedBy: "Kathryn", LastUpdate: "Male" },
]

const SystemOverviewListTable: React.FC<SystemOverviewListTableProps> = ({ data}, probObject:object) => {
    return (
        <div>
            <div className='cardBody'>
                {/* Dashboard List */}
                <div className="listTable">
                    <table>
                        <tr>
                        <th>Community</th>
                        <th>Community System Status</th>
                        <th>Maintenance Status</th>
                        <th>Diagnostic Status</th>
                        <th>Checked By</th>
                        <th>Last Update</th>
                        </tr>
                        {data.map((val: any, key: any) => {
                        return (
                            <tr key={key}>
                            <td>{val.Community}</td>
                            <td>{val.CommunitySystemStatus}</td>
                            <td>{val.MaintenanceStatus}</td>
                            <td>{val.DiagnosticStatus}</td>
                            <td>{val.CheckedBy}</td>
                            <td>{val.LastUpdate}</td>
                            </tr>
                        )
                        })}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SystemOverviewListTable; 
