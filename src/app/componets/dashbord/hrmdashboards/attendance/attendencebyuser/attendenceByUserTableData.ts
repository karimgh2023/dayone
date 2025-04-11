export interface attendanceByUserType{
    id: number
    Date: string;
    Day:string;
    Status: string;
    StatusText: string;
    ClockIn: string;
    ClockOut: string;
    Progress: number;
}

export const attendanceByUser:attendanceByUserType[] | any=[
    {id:'1', Date:'28-01-2021', Day:'Thursday', Status: 'badge-success-light', StatusText:'Present',  ClockIn:'09:30 AM', ClockOut:'06:30 PM', Progress:100},
    {id:'2', Date:'27-01-2021', Day:'Wednesday', Status: 'badge-success-light', StatusText:'Present',  ClockIn:'09:30 AM', ClockOut:'06:30 PM', Progress:100},
    {id:'3', Date:'26-01-2021', Day:'Tuesday', Status: 'badge-pink-light', StatusText:'Holiday (Republic Day)',  ClockIn:'--', ClockOut:'--', Progress:0},
    {id:'4', Date:'25-01-2021', Day:'Monday', Status: 'badge-orange-light', StatusText:'Late',  ClockIn:'09:50 AM', ClockOut:'06:30 PM', Progress:90},
    {id:'5', Date:'24-01-2021', Day:'Sunday', Status: 'badge-pink-light', StatusText:'Holiday (Sunday)',  ClockIn:'--', ClockOut:'--', Progress:0},
    {id:'6', Date:'23-01-2021', Day:'Saturday', Status: 'badge-success-light', StatusText:'Present',  ClockIn:'09:30 AM', ClockOut:'06:30 PM', Progress:100},
    {id:'7', Date:'22-01-2021', Day:'Friday', Status: 'badge-success-light', StatusText:'Present',  ClockIn:'09:30 AM', ClockOut:'06:30 PM', Progress:100},
    {id:'8', Date:'21-01-2021', Day:'Thursday', Status: 'badge-success-light', StatusText:'Present',  ClockIn:'09:30 AM', ClockOut:'06:30 PM', Progress:100},
    {id:'9', Date:'20-01-2021', Day:'Wednesday', Status: 'badge-success-light', StatusText:'Present',  ClockIn:'09:30 AM', ClockOut:'06:30 PM', Progress:100},
    {id:'10', Date:'19-01-2021', Day:'Tuesday', Status: 'badge-success-light', StatusText:'Present',  ClockIn:'09:30 AM', ClockOut:'06:30 PM', Progress:100},
    {id:'11', Date:'18-01-2021', Day:'Monday', Status: 'badge-success-light', StatusText:'Present', ClockIn:'09:30 AM', ClockOut:'06:30 PM', Progress:100},
    {id:'12', Date:'17-01-2021', Day:'Sunday', Status: 'badge-pink-light', StatusText:'Holiday (Sunday)', ClockIn:'--', ClockOut:'--', Progress:0},
    {id:'13', Date:'16-01-2021', Day:'Saturday', Status: 'badge-danger-light', StatusText:'Absent', ClockIn:'--', ClockOut:'--', Progress:0},
    {id:'14', Date:'15-01-2021', Day:'Friday', Status: 'badge-danger-light', StatusText:'Absent', ClockIn:'--', ClockOut:'--', Progress:0},
    {id:'15', Date:'14-01-2021', Day:'Thursday', Status: 'badge-danger-light', StatusText:'Absent', ClockIn:'--', ClockOut:'--', Progress:0}
]