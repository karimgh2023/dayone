import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportDTO } from '@/app/models/reportDTO.model';
import { StandardChecklistItemDTO } from '@/app/models/StandardChecklistItemDTO.model';
import { SpecificChecklistItemDTO } from '@/app/models/SpecificChecklistItemDTO.model';
import { MaintenanceForm } from '@/app/models/maintenance-form.model';
import { ValidationChecklistItem } from '@/app/models/ValidationChecklistItem.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {}

  generateReportPdf(
    report: ReportDTO,
    standardChecklist: StandardChecklistItemDTO[],
    specificChecklist: SpecificChecklistItemDTO[],
    validationChecklist: ValidationChecklistItem[],
    maintenanceForm: MaintenanceForm
  ): void {
    const doc = new jsPDF();

    this.addFrenchHeader(doc, report);
    this.addValidationChecklist(doc, validationChecklist);
    this.addEquipmentDetails(doc, report);
    this.addStandardChecklist(doc, standardChecklist);
    this.addSpecificChecklist(doc, specificChecklist);
    this.addMaintenanceForm(doc, maintenanceForm);

    doc.save(`rapport_${report.serialNumber}.pdf`);
  }

  private addFrenchHeader(doc: jsPDF, report: ReportDTO): void {
    doc.setFontSize(18);
    doc.text(report.designation || `Rapport - ${report.type}`, 14, 20);
    doc.setFontSize(12);
    doc.text(`Statut: Complété`, 14, 28);
    doc.text(`Date de création: ${new Date(report.createdAt).toLocaleDateString('fr-FR')}`, 14, 35);
  }

  

  private addEquipmentDetails(doc: jsPDF, report: ReportDTO): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Informations sur l\'équipement', 14, 20);

    autoTable(doc, {
      startY: 30,
      body: [
        ['Désignation', report.designation || '-'],
        ['Numéro de série', report.serialNumber || '-'],
        ['Fabricant', report.manufacturer || '-'],
        ['Immobilisation', report.immobilization || '-'],
        ['Service / Seg', report.serviceSeg || '-'],
        ['Business Unit', report.businessUnit || '-']
      ],
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [66, 139, 202], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });
  }

  private addStandardChecklist(doc: jsPDF, checklist: StandardChecklistItemDTO[]): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Checklist Standard', 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Critère', 'Implémenté', 'Action', 'Responsable', 'Délai', 'Contrôle de succès']],
      body: checklist.map(item => [
        item.criteriaDescription || '-',
        item.implemented ? 'Oui' : 'Non',
        item.action || '-',
        item.responsableAction || '-',
        item.deadline ? new Date(item.deadline).toLocaleDateString('fr-FR') : '-',
        item.successControl || '-'
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 55 },
        1: { cellWidth: 20 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
        5: { cellWidth: 30 }
      },
      headStyles: { fillColor: [66, 139, 202], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });
  }

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
        item.deadline ? new Date(item.deadline).toLocaleDateString('fr-FR') : '-',
        item.successControl || '-'
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      columnStyles: {
        0: { cellWidth: 55 },
        1: { cellWidth: 20 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 25 },
        5: { cellWidth: 30 }
      },
      headStyles: { fillColor: [66, 139, 202], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });
  }

  private addValidationChecklist(doc: jsPDF, checklist: ValidationChecklistItem[]): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Checklist de Validation', 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [['Critère', 'Département', 'Type', 'Statut', 'Raison', 'Date']],
      body: checklist.map(item => [
        item.criteria,
        item.department?.name || '-',
        item.protocolType || '-',
        item.status ? 'Validé' : 'Non validé',
        item.reason || '-',
        item.date ? new Date(item.date).toLocaleDateString('fr-FR') : '-'
      ]),
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [66, 139, 202], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });
  }

  private addMaintenanceForm(doc: jsPDF, form: MaintenanceForm): void {
    doc.addPage();
    doc.setFontSize(16);
    doc.text('État technique et maintenance', 14, 20);

    autoTable(doc, {
      startY: 30,
      body: [
        ['Circuit de puissance', form.powerCircuit || '-'],
        ['Circuit de commande', form.controlCircuit || '-'],
        ['Valeur de fusible', form.fuseValue || '-'],
        ['Fréquence', form.frequency || '-'],
        ['Test équilibre de phase 380V', form.phaseBalanceTest380v || '-'],
        ['Test équilibre de phase 210V', form.phaseBalanceTest210v || '-'],
        ['Résistance isolement moteur', form.insulationResistanceMotor || '-'],
        ['Résistance isolement câble', form.insulationResistanceCable || '-']
      ],
      styles: { fontSize: 10, cellPadding: 3 },
      columnStyles: { 0: { cellWidth: 70 }, 1: { cellWidth: 'auto' } }
    });
  }
}
