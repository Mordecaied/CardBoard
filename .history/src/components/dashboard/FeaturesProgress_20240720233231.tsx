import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Feature } from '../../types';

interface FeaturesProgressProps {
  features: Feature[] | string[];
}

export const FeaturesProgress: React.FC<FeaturesProgressProps> = ({ features }) => {
  const isFeatureArray = (arr: Feature[] | string[]): arr is Feature[] => {
    return arr.length > 0 && typeof arr[0] !== 'string';
  };

  const getData = () => {
    if (isFeatureArray(features)) {
      return features.flatMap(feature => 
        Object.entries(feature.progress).map(([key, value]) => ({
          name: key,
          [feature.name]: value,
        }))
      );
    } else {
      // If features is a string array, create dummy data
      return features.map(feature => ({
        name: feature,
        progress: Math.floor(Math.random() * 100), // Replace with actual progress data when available
      }));
    }
  };

  const data = getData();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Progress by Features</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {isFeatureArray(features) 
              ? features.map((feature, index) => (
                  <Bar key={feature.name} dataKey={feature.name} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                ))
              : <Bar dataKey="progress" fill="#8884d8" />
            }
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default FeaturesProgress;