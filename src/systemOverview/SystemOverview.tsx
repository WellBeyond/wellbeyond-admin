import React, { useState } from 'react';
import DashboardPieChart from '../dashboard/DashboardPieChart';
import DashboardSectionHeader from '../dashboard/DashboardSectionHeader';
import { checklistNextDueDateUtil } from '../utils/utils';
import SystemOverviewHeader from './SystemOverviewHeader';
import { useDataProvider, useTranslate, useVersion } from 'react-admin';
import SystemOverviewListTable from './SystemOverviewListTable';


const SystemOverviewComponent = () => {
    const translate = useTranslate();
    const [diagnosticLogs, setDiagnosticLogs] = useState<[]>([]);
    const [maintenanceLogs, setMaintenanceLogs] = useState<[]>([]);
    const [checklists, setChecklists] = useState<[]>([]);

    const maintenanceStatuses = () => {
        let totalCompliant = 0
        let totalNonCompliant = 0
        

        const complianceStatus = checklists && maintenanceLogs && maintenanceLogs.map((log: any)=> {
            const lastChecklistUpdate = new Date(log.started)
            const associatedChecklist:any = checklists.find((checklist: any)=> log.checklistId === checklist.id) 
            const checklistFrequency = associatedChecklist && associatedChecklist.frequency

            const checklistNextDueDate:any = checklistNextDueDateUtil(checklistFrequency, lastChecklistUpdate)
            const complianceStatus = new Date(checklistNextDueDate.getFullYear(), checklistNextDueDate.getMonth(), checklistNextDueDate.getDate() + 30) < 
                new Date() ? 'compliant' : 'non-compliant'
            if (complianceStatus === 'compliant') totalCompliant+=1
            else totalNonCompliant +=1
            return complianceStatus
        }) 
        return { totalNonCompliant, totalCompliant, complianceStatus}
    }

    const diagnosticsStatuses = () => {
        let totalFunctioning = 0
        let totalIssueReported = 0
        let totalUnderReview = 0
        let totalPendingMaintenance = 0
        let totalContactCommunity = 0

        const organizationStatus = diagnosticLogs && diagnosticLogs.map((log: any) => {
            let status = log.adminReportedStatus || ''
            switch (status) {
                case 'issuesreported':
                    return totalIssueReported +=1
                case 'underreview':
                    return totalUnderReview +=1
                case 'functioning':
                    return totalFunctioning +=1
                case 'pendingmaintenance':
                    return totalPendingMaintenance +=1
                case 'contactcommunity':
                    return totalContactCommunity +=1
                default:
                    return 0
            }
        })
        return { organizationStatus,totalFunctioning, totalIssueReported, totalPendingMaintenance, totalUnderReview, totalContactCommunity}
    }

    const communitySystemStatusPieData = {
        labels:["Functioning", "Maintenance Checklist Overdue", "Unresolved Diagnostics", "Maintenance & Diagnostic needs"],
        datasets:[{
         data: [300, 50, 100, 40],
         backgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774"
          ],
         borderWidth: 1
        }]
      };

      const maintenanceStatusPieData = {
        labels:["Compliant", "Overdue"],
        datasets:[{
        //  data: [maintenanceStatuses().totalCompliant, maintenanceStatuses().totalNonCompliant],
        data: [75, 25],
         backgroundColor: [
            "#FF5A5E",
            "#5AD3D1"
          ],
         borderWidth: 1
        }]
      };

      const diagnosticStatusPieData = {
        labels:["Issue Reported", "Under Review", "Functioning", "Pending Maintenace", "Contact Community"],
        datasets:[{
        // data: [
        //     diagnosticsStatuses().totalIssueReported,
        //     diagnosticsStatuses().totalUnderReview,
        //     diagnosticsStatuses().totalFunctioning,
        //     diagnosticsStatuses().totalPendingMaintenance,
        //     diagnosticsStatuses().totalContactCommunity
        // ],
        data: [
            10,
            5,
            70,
            10,
            15
        ],
         backgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
          ],
         borderWidth: 1
        }]
      };

    // you might receive data from an API, convert to list and pass the data to the component
    const data = [
        { Community: "Anom", CommunitySystemStatus: 19, MaintenanceStatus: "Due", DiagnosticStatus: "Resolved", CheckedBy: "Clovis", LastUpdate: "7/11/22"  },
        { Community: "Megha", CommunitySystemStatus: 19, MaintenanceStatus: "Completed", DiagnosticStatus: "Pending", CheckedBy: "Bube", LastUpdate: "6/07/22"  },
        { Community: "Subham", CommunitySystemStatus: 25, MaintenanceStatus: "Completed", DiagnosticStatus: "Pending", CheckedBy: "Kathryn", LastUpdate: "8/17/22" },
    ]

    return (
        <div>
            {/* section Title */}
            <div style={{ marginLeft: '6%' }}>
                <SystemOverviewHeader sectionTitle={translate('SYSTEM OVERVIEW')} link='/systemOverview'/>
            </div>
            <div style={{ marginLeft: '5%', 'display': 'flex'}} className='dashboardPieChartContainer'>
                {/* Piechart components */}
                    <DashboardPieChart data={communitySystemStatusPieData} title='Community System Status' />
                    <DashboardPieChart data={maintenanceStatusPieData} title='Maintenance Status' />
                    <DashboardPieChart data={diagnosticStatusPieData} title='Diagnostic Status' /> 
            </div>
            {/* section Title */}
            <div style={{ marginLeft: '6%', marginTop: '40px' }}>
                <SystemOverviewHeader sectionTitle={translate('SYSTEM OVERVIEW LIST')} link='/systemOverview'/>
            </div>
            <div style={{ marginLeft: '5%', 'display': 'flex'}} className='dashboardPieChartContainer'>
                {/* List table components */}
                <SystemOverviewListTable data={data}/>
            </div>
            

        </div>
    );
}

export default SystemOverviewComponent