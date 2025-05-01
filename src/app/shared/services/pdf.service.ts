// pdf.service.ts
import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportDTO } from '@/app/models/reportDTO.model';
import { StandardChecklistItemDTO } from '@/app/models/StandardChecklistItemDTO.model';
import { SpecificChecklistItemDTO } from '@/app/models/SpecificChecklistItemDTO.model';
import { MaintenanceForm } from '@/app/models/maintenance-form.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {}

  generateReportPdf(
    report: ReportDTO,
    standardChecklist: StandardChecklistItemDTO[],
    specificChecklist: SpecificChecklistItemDTO[],
    maintenanceForm: MaintenanceForm
  ): void {
    const doc = new jsPDF();
    
    // Add report header
    this.addReportHeader(doc, report);
    
    // Add equipment details
    this.addEquipmentDetails(doc, report);
    
    // Add standard checklist
    this.addStandardChecklist(doc, standardChecklist);
    
    // Add specific checklist
    this.addSpecificChecklist(doc, specificChecklist);
    
    // Add maintenance form
    this.addMaintenanceForm(doc, maintenanceForm);
    
    // Save the PDF
    doc.save(`report_${report.serialNumber}.pdf`);
  }

  private addReportHeader(doc: jsPDF, report: ReportDTO): void {
    doc.setFontSize(20);
    doc.text('Report Details', 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Report ID', report.id.toString()],
        ['Type', report.type],
        ['Created By', report.createdByEmail],
        ['Created At', report.createdAt]
      ]
    });
  }

  private addEquipmentDetails(doc: jsPDF, report: ReportDTO): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Equipment Details', 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Serial Number', report.serialNumber],
        ['Equipment Description', report.equipmentDescription],
        ['Designation', report.designation],
        ['Manufacturer', report.manufacturer],
        ['Immobilization', report.immobilization],
        ['Service Segment', report.serviceSeg],
        ['Business Unit', report.businessUnit]
      ]
    });
  }

  private addStandardChecklist(doc: jsPDF, checklist: StandardChecklistItemDTO[]): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Standard Checklist', 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Criteria', 'Status', 'Action', 'Responsible', 'Deadline', 'Control']],
      body: checklist.map(item => [
        item.criteriaDescription,
        item.implemented ? 'Implemented' : 'Not Implemented',
        item.action || '-',
        item.responsableAction || '-',
        item.deadline || '-',
        item.successControl || '-'
      ])
    });
  }

  private addSpecificChecklist(doc: jsPDF, checklist: SpecificChecklistItemDTO[]): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Specific Checklist', 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Criteria', 'Status', 'Action', 'Responsible', 'Deadline', 'Control']],
      body: checklist.map(item => [
        item.criteriaDescription,
        item.homologation ? 'Homologated' : 'Not Homologated',
        item.action || '-',
        item.responsableAction || '-',
        item.deadline || '-',
        item.successControl || '-'
      ])
    });
  }

  private addMaintenanceForm(doc: jsPDF, form: MaintenanceForm): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Maintenance Form', 14, 20);
    
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Value']],
      body: [
        ['Power Circuit', form.powerCircuit || '-'],
        ['Control Circuit', form.controlCircuit || '-'],
        ['Fuse Value', form.fuseValue || '-'],
        ['Frequency', form.frequency || '-'],
        ['Phase Balance Test 380V', form.phaseBalanceTest380v || '-'],
        ['Phase Balance Test 210V', form.phaseBalanceTest210v || '-'],
        ['Insulation Resistance Motor', form.insulationResistanceMotor || '-'],
        ['Insulation Resistance Cable', form.insulationResistanceCable || '-']
      ]
    });
  }
}