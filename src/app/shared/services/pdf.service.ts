import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { ReportDTO } from '@/app/models/reportDTO.model';
import { StandardChecklistItemDTO } from '@/app/models/StandardChecklistItemDTO.model';
import { SpecificChecklistItemDTO } from '@/app/models/SpecificChecklistItemDTO.model';
import { MaintenanceForm } from '@/app/models/maintenance-form.model';
import { ValidationChecklistItem } from '@/app/models/ValidationChecklistItem.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly pageMargin = 10;  // mm

  constructor() {}

  generateReportPdf(
    report: ReportDTO,
    standardChecklist: StandardChecklistItemDTO[],
    specificChecklist: SpecificChecklistItemDTO[],
    validationChecklist: ValidationChecklistItem[],
    maintenanceForm: MaintenanceForm
  ): void {
    const doc = new jsPDF({ unit: 'mm' });

    this.addFrenchHeader(doc, report);
    let y = 55;
    y = this.addEquipmentDetails(doc, report, y);
    y = this.addValidationChecklist(doc, validationChecklist, y);
    this.addStandardChecklist(doc, standardChecklist);
    this.addSpecificChecklist(doc, specificChecklist);
    this.addMaintenanceForm(doc, maintenanceForm);

    doc.save(`rapport_${report.serialNumber}.pdf`);
  }

  private addFrenchHeader(doc: jsPDF, report: ReportDTO): void {
    // Centered title
    doc.setFontSize(22);
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = report.designation || `Rapport - ${report.type}`;
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 20);

    // Left-aligned status and date
    doc.setFontSize(12);
    doc.text(`Statut: Complété`, this.pageMargin, 35);
    doc.text(
      `Date de création: ${new Date(report.createdAt).toLocaleDateString('fr-FR')}`,
      this.pageMargin,
      42
    );

    // Horizontal line
    doc.setLineWidth(0.5);
    doc.line(this.pageMargin, 48, pageWidth - this.pageMargin, 48);
  }
  

  private addEquipmentDetails(doc: jsPDF, report: ReportDTO, startY: number = 20): number {
    doc.setFontSize(16);
    autoTable(doc, this.commonTableOptions({
      startY: startY + 5,
      head: [['Champ', 'Valeur']],
      body: [
        ['Désignation', report.designation || '-'],
        ['Numéro de série', report.serialNumber || '-'],
        ['Fabricant', report.manufacturer || '-'],
        ['Immobilisation', report.immobilization || '-'],
        ['Service / Seg', report.serviceSeg || '-'],
        ['Business Unit', report.businessUnit || '-']
      ]
    }));
    return (doc as any).lastAutoTable.finalY + 8;
  }

  private addValidationChecklist(doc: jsPDF, checklist: ValidationChecklistItem[], startY: number = 53): number {
    doc.setFontSize(16);
    autoTable(doc, this.commonTableOptions({
      startY: startY + 5,
      head: [['Critère', 'Département', 'Type', 'Statut', 'Raison', 'Date']],
      body: checklist.map(item => [
        item.criteria,
        item.department?.name || '-',
        item.protocolType || '-',
        item.status ? 'Validé' : 'Non validé',
        item.reason || '-',
        item.date ? new Date(item.date).toLocaleDateString('fr-FR') : '-'
      ])
    }));
    return (doc as any).lastAutoTable.finalY + 8;
  }

  private addStandardChecklist(doc: jsPDF, checklist: StandardChecklistItemDTO[]): void {
    doc.addPage();
    const pageWidth = doc.internal.pageSize.getWidth();
    const headerHeight = 25;
    const headerY = 15;
    const margin = this.pageMargin;

    // Draw blue rectangle
    doc.setFillColor(41, 128, 185); // Bootstrap blue
    doc.rect(margin, headerY, pageWidth - 2 * margin, headerHeight, 'F');

    // Left-aligned stacked text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text('IT TN 3 417', margin + 4, headerY + 8);
    doc.text('Annexe 1', margin + 4, headerY + 14);
    doc.text('Etat 07.2022', margin + 4, headerY + 20);

    // Centered bold title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    const title = 'Liste de vérification standard ';
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, headerY + 12);
    doc.setFont('helvetica', 'normal');

    // Right-aligned text
    doc.setFontSize(12);
    const rightText = 'LEONI';
    const rightTextWidth = doc.getTextWidth(rightText);
    doc.text(rightText, pageWidth - margin - rightTextWidth - 2, headerY + 8);

    // Reset text color for table
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    // Table title is omitted since the header is custom

    autoTable(doc, this.commonTableOptions({
      startY: headerY + headerHeight + 5,
      head: [['Critère', 'Implémenté', 'Action', 'Responsable', 'Délai', 'Contrôle de succès']],
      body: checklist.map(item => [
        item.criteriaDescription || '-',
        item.implemented ? 'Oui' : 'Non',
        item.action || '-',
        item.responsableAction || '-',
        item.deadline ? new Date(item.deadline).toLocaleDateString('fr-FR') : '-',
        item.successControl || '-'
      ]),
      columnStyles: {
        0: { cellWidth: 50 },
        4: { cellWidth: 22 },
      }
    }));
  }

  private addSpecificChecklist(doc: jsPDF, checklist: SpecificChecklistItemDTO[]): void {
    doc.addPage();
    const pageWidth = doc.internal.pageSize.getWidth();
    const headerHeight = 25;
    const headerY = 15;
    const margin = this.pageMargin;

    // Draw blue rectangle
    doc.setFillColor(41, 128, 185); // Bootstrap blue
    doc.rect(margin, headerY, pageWidth - 2 * margin, headerHeight, 'F');

    // Left-aligned stacked text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text('IT TN 3 418', margin + 4, headerY + 8);
    doc.text('Annexe 2', margin + 4, headerY + 14);
    doc.text('Etat 07.2022', margin + 4, headerY + 20);

    // Centered bold title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    const title = 'Liste de vérification spécifique pour homologation';
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, headerY + 12);
    doc.setFont('helvetica', 'normal');

    // Right-aligned text
    doc.setFontSize(12);
    const rightText = 'LEONI';
    const rightTextWidth = doc.getTextWidth(rightText);
    doc.text(rightText, pageWidth - margin - rightTextWidth - 2, headerY + 8);

    // Reset text color for table
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);

    autoTable(doc, this.commonTableOptions({
      startY: headerY + headerHeight + 5,
      head: [['Critère', 'Homologué', 'Action', 'Responsable', 'Délai', 'Contrôle de succès']],
      body: checklist.map(item => [
        item.criteriaDescription || '-',
        item.homologation ? 'Oui' : 'Non',
        item.action || '-',
        item.responsableAction || '-',
        item.deadline ? new Date(item.deadline).toLocaleDateString('fr-FR') : '-',
        item.successControl || '-'
      ])
    }));
  }

  private addMaintenanceForm(doc: jsPDF, form: MaintenanceForm): void {
    doc.addPage();
    const pageWidth = doc.internal.pageSize.getWidth();
    const headerHeight = 25;
    const headerY = 15;
    const margin = this.pageMargin;

    // Draw blue rectangle
    doc.setFillColor(41, 128, 185); // Bootstrap blue
    doc.rect(margin, headerY, pageWidth - 2 * margin, headerHeight, 'F');

    // Left-aligned stacked text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.text('IT TN 3 404', margin + 4, headerY + 8);
    doc.text('Annexe 1', margin + 4, headerY + 14);
    doc.text('Etat 10.2017', margin + 4, headerY + 20);

    // Centered bold title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    const title = 'État technique des équipements et des installations électriques';
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, headerY + 12);
    doc.setFont('helvetica', 'normal');

    // Right-aligned text
    doc.setFontSize(12);
    const rightText = 'LEONI';
    const rightTextWidth = doc.getTextWidth(rightText);
    doc.text(rightText, pageWidth - margin - rightTextWidth - 2, headerY + 8);

    // Reset text color for table
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);

    autoTable(doc, this.commonTableOptions({
      startY: headerY + headerHeight + 5,
      head: [['Champ', 'Valeur']],
      body: [
        ['Contrôlé selon', form.controlStandard || '-'],
        ['Nature du courant', form.currentType  || '-'],
        ['Circuit de puissance', form.powerCircuit || '-'],
        ['Circuit de commande', form.controlCircuit || '-'],
        ['Valeur de fusible', form.fuseValue || '-'],
        ['Présence de transformateur', form.hasTransformer === true ? 'Oui' : form.hasTransformer === false ? 'Non' : '-'],
        ['Fréquence', form.frequency || '-'],
        ['Test équilibre de phase 380V', form.phaseBalanceTest380v || '-'],
        ['Test équilibre de phase 210V', form.phaseBalanceTest210v || '-'],
        ['Résistance isolement moteur', form.insulationResistanceMotor || '-'],
        ['Résistance isolement câble', form.insulationResistanceCable || '-'],
        ['Hauteur', form.machineSizeHeight || '-'],
        ['Longueur', form.machineSizeLength || '-'],
        ['Largeur', form.machineSizeWidth || '-'],
        ['Ordre', form.isInOrder === true ? 'Oui' : form.isInOrder === false ? 'Non' : '-']
      ]
    }));
  }

  /**
   * Build a common config object for autoTable with margins, wrapping and auto column widths.
   */
  private commonTableOptions(options: Partial<UserOptions>): UserOptions {
    return {
      margin: { left: this.pageMargin, right: this.pageMargin },
      styles: {
        fontSize: 9,
        cellPadding: 3,
        overflow: 'linebreak',        // wrap long text
        cellWidth: 'auto'             // auto-fit into page width
      },
      headStyles: {
        fillColor: [66, 139, 202],
        textColor: 255,
        halign: 'center'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      tableWidth: 'auto',
      ...options
    };
  }
}
