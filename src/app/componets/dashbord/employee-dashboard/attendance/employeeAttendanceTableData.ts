export interface employeeAttendanceList{
    date: string;
    status: string;
    statusText: string;
    clockIn: string;
    clockOut: string;
    progress: number;
    progressStatus : string;
    hours: string;
    statusBg:string
}

export const employeeAttendance: employeeAttendanceList[] | any =[
    {date: '20-01-2021', status:'success', statusText:'Present', clockIn:'09:35 AM', clockOut:'06:55 PM', progressStatus: 'success', progress:100, hours: '09h :10 mins'},
    {date: '19-01-2021', status:'success', statusText:'Present', clockIn:'09:30 AM', clockOut:'06:30 PM', progressStatus: 'success', progress:100, hours: '09h :00 mins'},
    {date: '18-01-2021', status:'danger', statusText:'Absent', clockIn:'00:00 AM', clockOut:'00:00 PM', progressStatus: 'danger', progress:0, hours: '09h :10 mins'},
    {date: '17-01-2021', status:'success', statusText:'Present', clockIn:'09:35 AM', clockOut:'06:55 PM', progressStatus: 'success', progress:100, hours: '09h :10 mins'},
    {date: '16-01-2021', status:'warning', statusText:'Late', clockIn:'10:35 AM', clockOut:'6:30 PM', progressStatus: 'warning', progress:85, hours: '09h :10 mins'},
    {date: '15-01-2021', status:'success', statusText:'Present', clockIn:'09:35 AM', clockOut:'6:30 PM', progressStatus: 'success', progress:100, hours: '09h :10 mins'},
    {date: '14-01-2021', status:'warning', statusText:'Late', clockIn:'11:30 AM', clockOut:'6:35 PM', progressStatus: 'warning', progress:70, hours: '09h :10 mins'},
    {date: '13-01-2021', status:'success', statusText:'Present', clockIn:'09:35 AM', clockOut:'6:30 PM', progressStatus: 'success', progress:100, hours: '09h :10 mins'},
    {date: '12-01-2021', status:'success', statusText:'Present', clockIn:'00:00  AM', clockOut:'00:00  PM', progressStatus: 'success', progress:100, hours: '00h :00 mins'},
    {date: '11-01-2021', status:'danger', statusText:'Absent', clockIn:'09:35 AM', clockOut:'06:55 PM', progressStatus: 'danger', progress:0, hours: '09h :10 mins'},
    {date: '10-01-2021', status:'danger', statusText:'Absent', clockIn:'00:00 AM', clockOut:'00:00 PM', progressStatus: 'danger', progress:0, hours: '09h :10 mins'},
    {date: '09-01-2021', status:'success', statusText:'Present', clockIn:'9:30 AM', clockOut:'6:30 PM', progressStatus: 'success', progress:100, hours: '09h :0 mins'},
    {date: '08-01-2021', status:'success', statusText:'Present', clockIn:'9:32 AM', clockOut:'6:30 PM', progressStatus: 'success', progress:100, hours: '09h :0 mins'},
    {date: '07-01-2021', status:'success', statusText:'Present', clockIn:'9:30 AM', clockOut:'6:30 PM', progressStatus: 'success', progress:100, hours: '09h :0 mins'},
    {date: '06-01-2021', status:'success', statusText:'Present', clockIn:'9:30 AM', clockOut:'6:30 PM', progressStatus: 'success', progress:100, hours: '09h :0 mins'},
]