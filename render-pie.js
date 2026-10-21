// One slide showing pptxgenjs-plus pie label colours: the plain option (ignored) vs per-point labels (honoured).
const PptxGenJS = require('pptxgenjs-plus');

const out = process.argv[2];
const pres = new PptxGenJS();
pres.layout = 'LAYOUT_WIDE';
const slide = pres.addSlide();

const data = { name: 'Learning Walks', labels: [['Achieved', 'Partially', 'Not achieved']], values: [61, 18, 21] };
const common = {
  y: 1.6, w: 5, h: 4.6,
  chartColors: ['618232', 'FE9A00', 'E7000B'],
  showLegend: true, legendPos: 'b', legendFontSize: 12,
  dataLabelColor: 'FFFFFF', // asking for white labels
  dataLabelFontSize: 18, dataLabelFontBold: true, dataLabelFontFace: 'Calibri',
};

slide.addText('Pie chart data labels in pptxgenjs-plus 4.3.4', { x: 0.6, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, fontFace: 'Calibri', color: '2F3F58' });

// Left: the normal way. dataLabelColor is set to white, but the labels come out black.
slide.addText("Normal way: showPercent + dataLabelColor: 'FFFFFF'", { x: 0.9, y: 1.05, w: 5.5, h: 0.4, fontSize: 14, fontFace: 'Calibri', color: '364153' });
slide.addChart('pie', [data], { ...common, x: 0.9, showPercent: true });

// Right: per-point custom labels. The same dataLabelColor is honoured.
slide.addText("Workaround: per-point dataLabels, same dataLabelColor", { x: 7.1, y: 1.05, w: 5.8, h: 0.4, fontSize: 14, fontFace: 'Calibri', color: '364153' });
slide.addChart('pie', [{ ...data, dataLabels: ['61%', '18%', '21%'] }], { ...common, x: 7.1, showPercent: false });

pres.writeFile({ fileName: out }).then((f) => console.log('wrote', f));
