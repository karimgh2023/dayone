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

 // Updated generateReportPdf
generateReportPdf(
    report: ReportDTO,
    standardChecklist: StandardChecklistItemDTO[],
    specificChecklist: SpecificChecklistItemDTO[],
    maintenanceForm: MaintenanceForm
  ): void {
    const doc = new jsPDF();
  
    this.addFrenchHeader(doc, report);
    this.addSignatureSection(doc, report);
    this.addEquipmentDetails(doc, report);
    this.addStandardChecklist(doc, standardChecklist);
    this.addSpecificChecklist(doc, specificChecklist);
    this.addMaintenanceForm(doc, maintenanceForm);
  
    doc.save(`rapport_${report.serialNumber}.pdf`);
  }
  
  // Updated: French-styled header
  private addFrenchHeader(doc: jsPDF, report: ReportDTO): void {
    doc.setFontSize(18);
    doc.text(report.designation || `Rapport - ${report.type}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Statut:  'Complété`, 14, 28);
    doc.text(`Date de création: ${report.createdAt}`, 14, 35);
  }
  
  // Updated: Signature section with real data
  private addSignatureSection(doc: jsPDF, report: ReportDTO): void {
    doc.setFontSize(14);
    doc.text('Signatures', 14, 42);
    doc.setFontSize(10);

    // Get signatures from assigned users
    const signatures = report.assignedUsers?.map(user => ({
      name: user.firstName + ' ' + user.lastName || user.email?.split('@')[0] || 'Non spécifié',
      department: user.department?.name || 'Non spécifié',
      role: user.role || 'Non spécifié',
      signed: user.signed || false,
      signedAt: user.signedAt || null
    })) || [];

    // Add signature table
    autoTable(doc, {
      startY: 48,
      head: [['Nom', 'Département', 'Rôle', 'Signé', 'Date de signature']],
      body: signatures.map(s => [
        s.name,
        s.department,
        s.role,
        s.signed ? 'Oui' : 'Non',
        s.signedAt ? new Date(s.signedAt).toLocaleDateString('fr-FR') : '-'
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      }
    });

    // Add signature lines if needed
    if (signatures.length > 0) {
      const finalY = (doc as any).lastAutoTable.finalY || 100;
      doc.setFontSize(8);
      doc.text('Note: Les signatures électroniques sont valides conformément à la loi', 14, finalY + 10);
    }
  }
  
  // Updated: Equipment section in French
  private addEquipmentDetails(doc: jsPDF, report: ReportDTO): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Informations sur l\'équipement', 14, 20);
  
    autoTable(doc, {
      startY: 30,
      head: [['Champ', 'Valeur']],
      body: [
        ['Désignation', report.designation || '-'],
        ['Numéro de série', report.serialNumber || '-'],
        ['Fabricant', report.manufacturer || '-'],
        ['Immobilisation', report.immobilization || '-'],
        ['Service / Seg', report.serviceSeg || '-'],
        ['Business Unit', report.businessUnit || '-']
      ]
    });
  }
  
  // Updated: Standard checklist (French headers)
  private addStandardChecklist(doc: jsPDF, checklist: StandardChecklistItemDTO[]): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Checklist Standard', 14, 20);
  
    autoTable(doc, {
      startY: 30,
      head: [['Critère', 'Implémenté', 'Action', 'Responsable', 'Délai', 'Contrôle de succès']],
      body: checklist.map(item => [
        item.criteriaDescription,
        item.implemented ? 'Oui' : 'Non',
        item.action || '-',
        item.responsableAction || '-',
        item.deadline || '-',
        item.successControl || '-'
      ])
    });
  }
  
  // Updated: Specific checklist
  private addSpecificChecklist(doc: jsPDF, checklist: SpecificChecklistItemDTO[]): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Checklist Spécifique', 14, 20);
  
    autoTable(doc, {
      startY: 30,
      head: [['Critère', 'Homologué', 'Action', 'Responsable', 'Délai', 'Contrôle de succès']],
      body: checklist.map(item => [
        item.criteriaDescription,
        item.homologation ? 'Oui' : 'Non',
        item.action || '-',
        item.responsableAction || '-',
        item.deadline || '-',
        item.successControl || '-'
      ])
    });
  }
  
  // Updated: Maintenance form in French
  private addMaintenanceForm(doc: jsPDF, form: MaintenanceForm): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('État technique et maintenance', 14, 20);
  
    autoTable(doc, {
      startY: 30,
      head: [['Champ', 'Valeur']],
      body: [
        ['Circuit de puissance', form.powerCircuit || '-'],
        ['Circuit de commande', form.controlCircuit || '-'],
        ['Valeur de fusible', form.fuseValue || '-'],
        ['Fréquence', form.frequency || '-'],
        ['Test équilibre de phase 380V', form.phaseBalanceTest380v || '-'],
        ['Test équilibre de phase 210V', form.phaseBalanceTest210v || '-'],
        ['Résistance isolation moteur', form.insulationResistanceMotor || '-'],
        ['Résistance isolation câble', form.insulationResistanceCable || '-']
      ]
    });
  }
  
}