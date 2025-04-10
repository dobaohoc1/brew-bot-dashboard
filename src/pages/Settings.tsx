
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { Cog, MessageSquare, FileText, Bell, ShieldCheck, Database, Globe } from "lucide-react";

// Schema for general settings form
const generalSettingsSchema = z.object({
  shopName: z.string().min(2, { message: "Shop name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  logoUrl: z.string().url({ message: "Please enter a valid URL." }).optional(),
  currencySymbol: z.string().min(1, { message: "Currency symbol is required." }),
  timezone: z.string(),
});

// Schema for notification settings form
const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  orderConfirmations: z.boolean(),
  inventoryAlerts: z.boolean(),
  marketingEmails: z.boolean(),
  dailyReports: z.boolean(),
});

// Schema for chatbot settings form
const chatbotSettingsSchema = z.object({
  enabled: z.boolean(),
  welcomeMessage: z.string().min(10, { message: "Welcome message must be at least 10 characters." }),
  aiModel: z.string(),
  maxTokens: z.number().int().min(100).max(4000),
  temperature: z.number().min(0).max(1).step(0.1),
  knowledgeBase: z.string().min(5, { message: "Enter at least 5 characters for your knowledge base." }),
  offlineMessage: z.string(),
});

// Schema for report settings form
const reportSettingsSchema = z.object({
  dailyReportEnabled: z.boolean(),
  weeklyReportEnabled: z.boolean(),
  monthlyReportEnabled: z.boolean(),
  reportEmail: z.string().email({ message: "Please enter a valid email address." }),
  includeSales: z.boolean(),
  includeInventory: z.boolean(),
  includeCustomers: z.boolean(),
  customReportName: z.string().optional(),
});

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  // General settings form
  const generalForm = useForm<z.infer<typeof generalSettingsSchema>>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      shopName: "Coffee Shop",
      email: "contact@coffeeshop.com",
      phone: "0123456789",
      address: "123 Coffee Street, City",
      logoUrl: "https://example.com/logo.png",
      currencySymbol: "$",
      timezone: "UTC+7",
    },
  });

  // Notification settings form
  const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      orderConfirmations: true,
      inventoryAlerts: true,
      marketingEmails: false,
      dailyReports: true,
    },
  });

  // Chatbot settings form
  const chatbotForm = useForm<z.infer<typeof chatbotSettingsSchema>>({
    resolver: zodResolver(chatbotSettingsSchema),
    defaultValues: {
      enabled: true,
      welcomeMessage: "Hello! Welcome to our coffee shop. How can I assist you today?",
      aiModel: "gpt-4o-mini",
      maxTokens: 2000,
      temperature: 0.7,
      knowledgeBase: "Coffee menu, brewing methods, store locations, opening hours",
      offlineMessage: "Sorry, our chatbot is currently offline. Please try again later or contact us directly.",
    },
  });

  // Report settings form
  const reportForm = useForm<z.infer<typeof reportSettingsSchema>>({
    resolver: zodResolver(reportSettingsSchema),
    defaultValues: {
      dailyReportEnabled: true,
      weeklyReportEnabled: true,
      monthlyReportEnabled: true,
      reportEmail: "reports@coffeeshop.com",
      includeSales: true,
      includeInventory: true,
      includeCustomers: true,
      customReportName: "Coffee Shop Performance Report",
    },
  });

  // Handle form submissions
  const onSubmitGeneral = (data: z.infer<typeof generalSettingsSchema>) => {
    console.log("General settings:", data);
    toast({
      title: "General settings updated",
      description: "Your general settings have been saved successfully.",
    });
  };

  const onSubmitNotifications = (data: z.infer<typeof notificationSettingsSchema>) => {
    console.log("Notification settings:", data);
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved successfully.",
    });
  };

  const onSubmitChatbot = (data: z.infer<typeof chatbotSettingsSchema>) => {
    console.log("Chatbot settings:", data);
    toast({
      title: "Chatbot settings updated",
      description: "Your AI chatbot settings have been saved successfully.",
    });
  };

  const onSubmitReports = (data: z.infer<typeof reportSettingsSchema>) => {
    console.log("Report settings:", data);
    toast({
      title: "Report settings updated",
      description: "Your report configurations have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your coffee shop system settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Cog className="h-4 w-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden md:inline">AI Chatbot</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure the basic information for your coffee shop
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)} className="space-y-6">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={generalForm.control}
                      name="shopName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shop Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Coffee Shop" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={generalForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="contact@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="currencySymbol"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency Symbol</FormLabel>
                          <FormControl>
                            <Input placeholder="$" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="timezone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Zone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a timezone" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="UTC+7">UTC+7 (Bangkok, Jakarta)</SelectItem>
                              <SelectItem value="UTC+8">UTC+8 (Beijing, Hong Kong)</SelectItem>
                              <SelectItem value="UTC+9">UTC+9 (Tokyo, Seoul)</SelectItem>
                              <SelectItem value="UTC+0">UTC+0 (London, Lisbon)</SelectItem>
                              <SelectItem value="UTC-5">UTC-5 (New York, Toronto)</SelectItem>
                              <SelectItem value="UTC-8">UTC-8 (Los Angeles, Vancouver)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/logo.png" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={generalForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shop Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your shop address" 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onSubmitNotifications)} className="space-y-6">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications for important events
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="orderConfirmations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Order Confirmations</FormLabel>
                          <FormDescription>
                            Receive notifications when orders are placed
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="inventoryAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Inventory Alerts</FormLabel>
                          <FormDescription>
                            Notify when inventory items are low
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="marketingEmails"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Marketing Emails</FormLabel>
                          <FormDescription>
                            Receive promotional and marketing emails
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={notificationForm.control}
                    name="dailyReports"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Daily Reports</FormLabel>
                          <FormDescription>
                            Receive daily sales and performance reports
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Notification Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Chatbot Settings */}
        <TabsContent value="chatbot">
          <Card>
            <CardHeader>
              <CardTitle>AI Chatbot Settings</CardTitle>
              <CardDescription>
                Configure your AI chatbot's behavior and responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...chatbotForm}>
                <form onSubmit={chatbotForm.handleSubmit(onSubmitChatbot)} className="space-y-6">
                  <FormField
                    control={chatbotForm.control}
                    name="enabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Enable AI Chatbot</FormLabel>
                          <FormDescription>
                            Show the AI chatbot on your customer-facing website
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={chatbotForm.control}
                      name="aiModel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>AI Model</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an AI model" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                              <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                              <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview</SelectItem>
                              <SelectItem value="llama-3.1-sonar-small-128k">Llama 3.1 Sonar Small 128k</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Select the AI model that powers your chatbot
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={chatbotForm.control}
                      name="maxTokens"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Max Tokens</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min={100} 
                              max={4000} 
                              placeholder="2000"
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum length of chatbot responses (100-4000)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={chatbotForm.control}
                      name="temperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Temperature ({field.value})</FormLabel>
                          <FormControl>
                            <Input 
                              type="range" 
                              min={0} 
                              max={1} 
                              step={0.1}
                              className="cursor-pointer"
                              {...field}
                              onChange={e => field.onChange(parseFloat(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Lower for more predictable responses, higher for more creative ones
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                    
                  <FormField
                    control={chatbotForm.control}
                    name="welcomeMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Welcome Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Hello! How can I help you today?" 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          The initial message shown when a customer opens the chat
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={chatbotForm.control}
                    name="offlineMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Offline Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Sorry, our chatbot is currently offline." 
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Message shown when the chatbot is disabled or unavailable
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={chatbotForm.control}
                    name="knowledgeBase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Knowledge Base</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter information about your coffee shop here..." 
                            className="min-h-48"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Key information to include in chatbot responses (menu, hours, policies, etc.)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Chatbot Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Report Settings */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
              <CardDescription>
                Configure your custom reports and reporting preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Form {...reportForm}>
                <form onSubmit={reportForm.handleSubmit(onSubmitReports)} className="space-y-6">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <FormField
                      control={reportForm.control}
                      name="reportEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Report Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="reports@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Email address to receive automated reports
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={reportForm.control}
                      name="customReportName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Report Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Coffee Shop Performance" {...field} />
                          </FormControl>
                          <FormDescription>
                            Name for your custom reports
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={reportForm.control}
                      name="dailyReportEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Daily Reports</FormLabel>
                            <FormDescription>
                              Send a summary report every day
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={reportForm.control}
                      name="weeklyReportEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Weekly Reports</FormLabel>
                            <FormDescription>
                              Send a detailed report every week
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={reportForm.control}
                      name="monthlyReportEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Monthly Reports</FormLabel>
                            <FormDescription>
                              Send a comprehensive report every month
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Report Contents</h3>
                    <p className="text-sm text-muted-foreground">Select which data to include in your reports</p>
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <FormField
                      control={reportForm.control}
                      name="includeSales"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Sales Data</FormLabel>
                            <FormDescription>
                              Include sales analytics
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={reportForm.control}
                      name="includeInventory"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Inventory</FormLabel>
                            <FormDescription>
                              Include inventory data
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={reportForm.control}
                      name="includeCustomers"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1">
                            <FormLabel>Customer Data</FormLabel>
                            <FormDescription>
                              Include customer metrics
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2 mt-6">
                    <h3 className="text-lg font-medium">Available Reports</h3>
                    <p className="text-sm text-muted-foreground">List of reports that can be generated</p>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Sales Summary</TableCell>
                        <TableCell>Overview of sales performance</TableCell>
                        <TableCell>Daily</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Generate</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Inventory Status</TableCell>
                        <TableCell>Current inventory levels</TableCell>
                        <TableCell>Weekly</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Generate</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Customer Insights</TableCell>
                        <TableCell>Customer behavior analytics</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Generate</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Product Performance</TableCell>
                        <TableCell>Analysis of product sales</TableCell>
                        <TableCell>Monthly</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Generate</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="flex justify-end">
                    <Button type="submit">Save Report Settings</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Password</h3>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium">Current Password</label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium">Confirm New Password</label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Protect your account with 2FA</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">API Access</h3>
                  <p className="text-sm text-muted-foreground">Manage API keys for integrations</p>
                </div>
                
                <div className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Primary API Key</h4>
                      <p className="text-sm text-muted-foreground">Created on April 10, 2025</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reveal</Button>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">Generate New API Key</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
