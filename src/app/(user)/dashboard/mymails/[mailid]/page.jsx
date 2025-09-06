"use client";

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Mail, 
  Calendar, 
  User, 
  AlertTriangle, 
  MessageSquare, 
  Tag, 
  Clock, 
  Zap,
  Brain,
  Copy,
  Check,
  Loader2Icon
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const MailPage = () => {
  const params = useParams();
  const { mailid } = params;
  const user = useSelector(state => state.user);
  const [emailData, setEmailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchEmailData = async () => {
      if (!mailid || !user?.uid) return;
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/myemail/${mailid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.uid }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch email data');
        }
        
        const data = await response.json();
        setEmailData(data);
      } catch (error) {
        console.error('Error fetching email:', error);
        toast.error('Failed to load email details');
      } finally {
        setLoading(false);
      }
    };

    fetchEmailData();
  }, [mailid, user]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return "bg-red-100 text-red-800";
      case 2: return "bg-yellow-100 text-yellow-800";
      case 3: return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return "bg-green-100 text-green-800";
      case 'negative': return "bg-red-100 text-red-800";
      case 'neutral': return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2Icon className="animate-spin rounded-full h-12 w-12 text-theme-purple  "/>
      </div>
    );
  }

  if (!emailData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Email not found</h3>
          <p className="mt-1 text-sm text-gray-500">The requested email could not be found.</p>
        </div>
      </div>
    );
  }

  const { 
    sender, 
    subject, 
    body, 
    receivedAt, 
    meta, 
    responses 
  } = emailData;

  const aiResponse = responses?.[0];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header */}
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-gray-900">Email Details</h1>
    </div>

    <div className="space-y-6">
      {/* Email Header */}
      <Card className="shadow-sm border-0">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-theme-purple/10 text-theme-purple">
                  {sender?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{subject}</h2>
                <div className="flex items-center mt-1 text-sm text-gray-600">
                  <User className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{sender}</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs whitespace-nowrap">
              <Calendar className="mr-1 h-3 w-3" />
              {format(new Date(receivedAt), 'MMM d, yyyy h:mm a')}
            </Badge>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {body}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - AI Response */}
        <div className="lg:col-span-2 space-y-6">
          {aiResponse && (
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-theme-purple">
                  <Brain className="mr-2 h-5 w-5" />
                  AI-Generated Response
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="prose max-w-none whitespace-pre-wrap text-gray-800 text-sm">
                    {aiResponse.draft}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {aiResponse.keyReferences?.map((ref, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {ref}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(aiResponse.draft)}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" /> Copy Response
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Analysis */}
        <div className="space-y-6">
          {/* Analysis Summary */}
          {meta && (
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-theme-purple">
                  <Zap className="mr-2 h-5 w-5" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-theme-purple mr-2" />
                    <span className="font-medium">Priority</span>
                  </div>
                  <Badge className={getPriorityColor(meta.processingPriority)}>
                    {meta.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-theme-purple mr-2" />
                    <span className="font-medium">Sentiment</span>
                  </div>
                  <Badge className={getSentimentColor(meta.sentiment)}>
                    {meta.sentiment}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Tag className="h-5 w-5 text-theme-purple mr-2" />
                    <span className="font-medium">Category</span>
                  </div>
                  <span className="text-sm">{meta.category}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-theme-purple mr-2" />
                    <span className="font-medium">Emotional Score</span>
                  </div>
                  <span className="text-sm font-medium">
                    {meta.emotionalScore?.toFixed(1)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Analysis */}
          {meta && (
            <Card className="shadow-sm border-0">
              <CardHeader className="pb-3">
                <CardTitle>Analysis Details</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
                  <p className="text-sm text-gray-700">{meta.overallSummary}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Issue</h4>
                  <p className="text-sm text-gray-700">{meta.issueSummary}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                    {meta.customerRequirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                
                {meta.keywords?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {meta.keywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default MailPage;