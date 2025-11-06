/**
 * Computes the overall study status based on series progress and total series count.
 * @param {Array} seriesProgress - Array of { SeriesUID, status }
 * @param {number} totalSeries - Total number of series in the study
 * @returns {'new' | 'wip' | 'done'}
 */
function computeStudyStatus(seriesProgress, totalSeries) {
  const doneCount = seriesProgress.filter(sp => sp.status === 'done').length;
  const wipCount = seriesProgress.filter(sp => sp.status === 'wip' ).length;

  if (doneCount === totalSeries && totalSeries > 0) return 'done';
  if (doneCount > 0 || wipCount > 0) return 'wip';
  return 'new';
}

module.exports = { computeStudyStatus };
