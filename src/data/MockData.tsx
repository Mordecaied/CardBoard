// src/data/mockData.ts

import { ReleaseData } from '../types';

export const releaseData: { [key: string]: ReleaseData } = {
  'Release 1.0': {
    releaseName: 'Release 1.0',
    team: 'Core Team',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-30'),
    description: 'Major feature release including UI overhaul and performance improvements',
    features: ['New UI', 'Performance optimization', 'Cloud integration'],
    milestones: [
      { id: 1, name: 'Planning Complete', date: new Date('2024-01-15') },
      { id: 2, name: 'Development Start', date: new Date('2024-02-01') },
      { id: 3, name: 'Alpha Release', date: new Date('2024-04-01') },
      { id: 4, name: 'Beta Release', date: new Date('2024-05-15') },
      { id: 5, name: 'Release Candidate', date: new Date('2024-06-15') },
      { id: 6, name: 'Go Live', date: new Date('2024-06-30') },
    ],
    categories: [
      { name: 'Development', progress: 75, tasksCompleted: 150, totalTasks: 200 },
      { name: 'Testing', progress: 60, tasksCompleted: 90, totalTasks: 150 },
      { name: 'Documentation', progress: 80, tasksCompleted: 40, totalTasks: 50 },
    ],
    progress: 70,
    bugs: {
      totalUnresolved: 15,
      resolved: 85,
      inProgress: 10,
      toDo: 5,
    },
    development: {
      completed: 150,
      inProgress: 40,
      notStarted: 10,
      blocked: 5,
    },
    tasks: {
        'Development': { total: 200, completed: 150, startDate: '2024-02-01', endDate: '2024-05-31', workingDays: 85 },
        'Testing': { total: 150, completed: 90, startDate: '2024-04-01', endDate: '2024-06-15', workingDays: 55 },
        'Documentation': { total: 50, completed: 40, startDate: '2024-05-01', endDate: '2024-06-30', workingDays: 45 },
      },
      teamMembers: {
        'Development': ['John Doe', 'Jane Smith'],
        'Testing': ['Alice Johnson', 'Bob Williams'],
        'Management': ['Carol Brown'],
      },
  },
  'Release 2.0': {
    releaseName: 'Release 2.0',
    team: 'Innovation Team',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-12-31'),
    description: 'AI-driven features and expanded third-party integrations',
    features: ['AI Assistant', 'Advanced Analytics', 'API Expansion'],
    milestones: [
      { id: 1, name: 'Planning Complete', date: new Date('2024-07-15') },
      { id: 2, name: 'Development Start', date: new Date('2024-08-01') },
      { id: 3, name: 'Alpha Release', date: new Date('2024-10-01') },
      { id: 4, name: 'Beta Release', date: new Date('2024-11-15') },
      { id: 5, name: 'Release Candidate', date: new Date('2024-12-15') },
      { id: 6, name: 'Go Live', date: new Date('2024-12-31') },
    ],
    categories: [
      { name: 'Development', progress: 40, tasksCompleted: 80, totalTasks: 200 },
      { name: 'Testing', progress: 30, tasksCompleted: 45, totalTasks: 150 },
      { name: 'Documentation', progress: 20, tasksCompleted: 10, totalTasks: 50 },
    ],
    progress: 35,
    bugs: {
      totalUnresolved: 25,
      resolved: 35,
      inProgress: 15,
      toDo: 10,
    },
    development: {
      completed: 80,
      inProgress: 100,
      notStarted: 70,
      blocked: 10,
    },
    tasks: {
        'Development': { total: 250, completed: 80, startDate: '2024-08-01', endDate: '2024-11-30', workingDays: 90 },
        'Testing': { total: 180, completed: 45, startDate: '2024-10-01', endDate: '2024-12-15', workingDays: 55 },
        'Documentation': { total: 60, completed: 10, startDate: '2024-11-01', endDate: '2024-12-31', workingDays: 45 },
      },
      teamMembers: {
        'Development': ['David Lee', 'Emma Wilson'],
        'Testing': ['Frank Miller', 'Grace Taylor'],
        'Management': ['Henry Davis'],
      },
  },
  'Hotfix 1.1': {
    releaseName: 'Hotfix 1.1',
    team: 'Support Team',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-15'),
    description: 'Critical bug fixes and security updates',
    features: ['Security Patch', 'Performance Hotfix'],
    milestones: [
      { id: 1, name: 'Issue Identification', date: new Date('2024-08-01') },
      { id: 2, name: 'Fix Development', date: new Date('2024-08-05') },
      { id: 3, name: 'Testing', date: new Date('2024-08-10') },
      { id: 4, name: 'Deployment', date: new Date('2024-08-15') },
    ],
    categories: [
      { name: 'Development', progress: 100, tasksCompleted: 20, totalTasks: 20 },
      { name: 'Testing', progress: 100, tasksCompleted: 15, totalTasks: 15 },
      { name: 'Documentation', progress: 100, tasksCompleted: 5, totalTasks: 5 },
    ],
    progress: 100,
    bugs: {
      totalUnresolved: 0,
      resolved: 10,
      inProgress: 0,
      toDo: 0,
    },
    development: {
      completed: 20,
      inProgress: 0,
      notStarted: 0,
      blocked: 0,
    },
    tasks: {
        'Development': { total: 20, completed: 20, startDate: '2024-08-01', endDate: '2024-08-10', workingDays: 8 },
        'Testing': { total: 15, completed: 15, startDate: '2024-08-10', endDate: '2024-08-14', workingDays: 5 },
        'Documentation': { total: 5, completed: 5, startDate: '2024-08-14', endDate: '2024-08-15', workingDays: 2 },
      },
      teamMembers: {
        'Development': ['Ivy Chen'],
        'Testing': ['Jack Robinson'],
        'Management': ['Karen White'],
      },
  },
};

export const releases = Object.keys(releaseData);