import { BarChart3, PieChart, TrendingUp, LucideIcon } from "lucide-react";
import { BuilderElement } from "@/app/builder/page";

export interface ElementDefinition {
  name: string;
  icon: LucideIcon;
  description: string;
  element: Omit<BuilderElement, 'id'>;
}

export const DataTableDefinition: ElementDefinition = {
  name: 'Data Table',
  icon: BarChart3,
  description: 'Data table with sorting',
  element: {
    type: 'data-table' as const,
    position: { x: 100, y: 100 },
    size: { width: 500, height: 300 },
    props: {
      headers: ['Name', 'Email', 'Role'],
      rows: [
        ['John Doe', 'john@example.com', 'Admin'],
        ['Jane Smith', 'jane@example.com', 'User']
      ],
      sortable: true,
      striped: true,
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb'
    }
  }
};

export const ChartDefinition: ElementDefinition = {
  name: 'Chart',
  icon: PieChart,
  description: 'Interactive chart',
  element: {
    type: 'chart' as const,
    position: { x: 100, y: 100 },
    size: { width: 400, height: 300 },
    props: {
      type: 'bar',
      data: [
        { label: 'Jan', value: 100 },
        { label: 'Feb', value: 150 },
        { label: 'Mar', value: 200 }
      ],
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb'
    }
  }
};

export const ProgressBarDefinition: ElementDefinition = {
  name: 'Progress Bar',
  icon: BarChart3,
  description: 'Progress indicator',
  element: {
    type: 'progress-bar' as const,
    position: { x: 100, y: 100 },
    size: { width: 300, height: 20 },
    props: {
      value: 65,
      max: 100,
      label: 'Progress',
      showPercentage: true,
      backgroundColor: '#e5e7eb',
      fillColor: '#3b82f6'
    }
  }
};

export const StatsCardDefinition: ElementDefinition = {
  name: 'Stats Card',
  icon: TrendingUp,
  description: 'Statistics display card',
  element: {
    type: 'stats-card' as const,
    position: { x: 100, y: 100 },
    size: { width: 200, height: 120 },
    props: {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb'
    }
  }
};

