import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const PieChart = ({ visitors, firstImpressions, popularPage }) => {
  const findVal = () => {
    const data = [];
    const valObj = {};
    visitors.forEach(
      (v) =>
        v.email !== 'mbruer@gmail.com' &&
        (valObj[v.history[0]] = (valObj[v.history[0]] || 0) + 1)
    );
    for (const page in valObj) {
      data.push({
        id: `${page}`,
        label: `${page}`,
        value: valObj[page],
      });
    }
    return data;
  };

  const findPopularPageValue = () => {
    const data = [];
    const valObj = {};
    visitors.forEach(
      (v) =>
        v.email !== 'mbruer@gmail.com' &&
        v.history.forEach((page) => (valObj[page] = (valObj[page] || 0) + 1))
    );
    for (const page in valObj) {
      data.push({
        id: `${page}`,
        label: `${page}`,
        value: valObj[page],
      });
    }
    return data;
  };

  const data = () => {
    if (firstImpressions) {
      return findVal();
    }
    if (popularPage) {
      return findPopularPageValue();
    }
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ResponsivePie
        sortByValue={true}
        colors={{ scheme: 'set1' }}
        data={data()}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.3}
        padAngle={5}
        cornerRadius={3}
        activeOuterRadiusOffset={25}
        borderWidth={3}
        borderColor={{ from: 'color', modifiers: [['darker', 0.9]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="white"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={'white'}
        // defs={[
        //   {
        //     id: 'dots',
        //     type: 'patternDots',
        //     background: 'inherit',
        //     color: 'rgba(255, 255, 255, 0.3)',
        //     size: 4,
        //     padding: 1,
        //     stagger: true,
        //   },
        //   {
        //     id: 'lines',
        //     type: 'patternLines',
        //     background: 'inherit',
        //     color: 'rgba(255, 255, 255, 0.3)',
        //     rotation: -45,
        //     lineWidth: 6,
        //     spacing: 10,
        //   },
        // ]}
        // fill={[
        //   {
        //     match: {
        //       id: '/',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'c',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'go',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'python',
        //     },
        //     id: 'dots',
        //   },
        //   {
        //     match: {
        //       id: 'scala',
        //     },
        //     id: 'lines',
        //   },
        //   {
        //     match: {
        //       id: 'lisp',
        //     },
        //     id: 'lines',
        //   },
        //   {
        //     match: {
        //       id: 'elixir',
        //     },
        //     id: 'lines',
        //   },
        //   {
        //     match: {
        //       id: 'javascript',
        //     },
        //     id: 'lines',
        //   },
        // ]}
        // legends={[
        //   {
        //     anchor: 'bottom',
        //     direction: 'column',
        //     justify: false,
        //     translateX: 0,
        //     translateY: 56,
        //     itemsSpacing: 0,
        //     itemWidth: 100,
        //     itemHeight: 18,
        //     itemTextColor: '#999',
        //     itemDirection: 'left-to-right',
        //     itemOpacity: 1,
        //     symbolSize: 18,
        //     symbolShape: 'circle',
        //     effects: [
        //       {
        //         on: 'hover',
        //         style: {
        //           itemTextColor: '#000',
        //         },
        //       },
        //     ],
        //   },
        // ]}
      />
    </div>
  );
};

export default PieChart;
