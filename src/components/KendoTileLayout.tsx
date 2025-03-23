
import React from 'react';
import { TileLayout } from '@progress/kendo-react-layout';

interface Tile {
  header?: string;
  body: React.ReactNode;
  colSpan?: number;
  rowSpan?: number;
}

interface KendoTileLayoutProps {
  tiles: Tile[];
  columns?: number;
  columnWidth?: number;
  rowHeight?: number;
  gap?: number;
  className?: string;
}

const KendoTileLayout: React.FC<KendoTileLayoutProps> = ({
  tiles,
  columns = 3,
  columnWidth = 200,
  rowHeight = 150,
  gap = 10,
  className = ''
}) => {
  return (
    <TileLayout
      columns={columns}
      columnWidth={columnWidth}
      rowHeight={rowHeight}
      gap={gap}
      className={className}
      items={tiles.map((tile, index) => ({
        header: tile.header,
        body: tile.body,
        colSpan: tile.colSpan || 1,
        rowSpan: tile.rowSpan || 1,
        reorderable: false,
        id: `tile-${index}`
      }))}
    />
  );
};

export default KendoTileLayout;
