
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  ArrowRight, 
  Check, 
  ChevronRight, 
  CreditCard, 
  Download, 
  HelpCircle, 
  InfoIcon, 
  Languages, 
  LayoutDashboard, 
  Moon, 
  PaintBucket, 
  RotateCcw, 
  Save, 
  Settings as SettingsIcon, 
  Smartphone, 
  Sun, 
  User,
  Palette,
  Bell,
  Shield,
  UserCircle,
  LogOut,
  Globe,
  Key,
  Lock,
  Mail
} from 'lucide-react';

export default function Settings() {
  const [theme, setTheme] = useState("dark");
  const [colorScheme, setColorScheme] = useState("indigo");

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    // In a real app, would persist this to localStorage or a backend
  };

  const handleColorSchemeChange = (scheme: string) => {
    setColorScheme(scheme);
    // In a real app, would update theme colors
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Manage your account settings and preferences.</p>
        </div>
        
        {/* Settings Tabs */}
        <Tabs defaultValue="account" className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:w-full">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            {/* Account Settings */}
            <TabsContent value="account" className="space-y-6">
              <Card className="glass-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Account Information</h2>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <img 
                          src="https://avatar.iran.liara.run/public" 
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-sm hover:bg-primary/90 transition-colors">
                        <UserCircle className="h-4 w-4" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Alex Morgan</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Data Analyst</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">alex.morgan@example.com</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="fullName">Full Name</Label>
                      <input
                        id="fullName"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        defaultValue="Alex Morgan"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email">Email Address</Label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        defaultValue="alex.morgan@example.com"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <input
                        id="jobTitle"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        defaultValue="Data Analyst"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="department">Department</Label>
                      <select
                        id="department"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option>Analytics</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Operations</option>
                        <option>IT</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      defaultValue="Data analyst with 5+ years of experience in business analytics and visualization. Specializing in sales performance metrics and trend analysis."
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Language & Region</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="timezone">Time Zone</Label>
                      <select
                        id="timezone"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option>Pacific Time (US & Canada)</option>
                        <option>Eastern Time (US & Canada)</option>
                        <option>Central Time (US & Canada)</option>
                        <option>Mountain Time (US & Canada)</option>
                        <option>UTC</option>
                        <option>Central European Time</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <select
                        id="dateFormat"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>JPY (¥)</option>
                        <option>CAD (CA$)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card border-red-200 dark:border-red-900">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Delete Account</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" className="flex items-center gap-1.5">
                    <LogOut className="h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </Card>
            </TabsContent>
            
            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card className="glass-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Appearance</h2>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          <Sun className="h-5 w-5 text-amber-500" />
                          Theme
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Select your preferred theme mode
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          variant={theme === "light" ? "default" : "outline"} 
                          className="gap-2 h-10 px-4 rounded-lg"
                          onClick={() => handleThemeChange("light")}
                        >
                          <Sun className="h-4 w-4" />
                          Light
                        </Button>
                        <Button 
                          variant={theme === "dark" ? "default" : "outline"} 
                          className="gap-2 h-10 px-4 rounded-lg"
                          onClick={() => handleThemeChange("dark")}
                        >
                          <Moon className="h-4 w-4" />
                          Dark
                        </Button>
                        <Button 
                          variant={theme === "system" ? "default" : "outline"} 
                          className="gap-2 h-10 px-4 rounded-lg"
                          onClick={() => handleThemeChange("system")}
                        >
                          <Globe className="h-4 w-4" />
                          System
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                          <Palette className="h-5 w-5 text-indigo-500" />
                          Color Scheme
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Choose your primary color scheme
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <button 
                          className={`h-10 w-10 rounded-full bg-blue-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 focus:outline-none ${colorScheme === 'blue' ? 'ring-2 ring-blue-600' : ''} transition-shadow`}
                          onClick={() => handleColorSchemeChange('blue')}
                        />
                        <button 
                          className={`h-10 w-10 rounded-full bg-indigo-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 focus:outline-none ${colorScheme === 'indigo' ? 'ring-2 ring-indigo-600' : ''} transition-shadow`}
                          onClick={() => handleColorSchemeChange('indigo')}
                        />
                        <button 
                          className={`h-10 w-10 rounded-full bg-purple-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 focus:outline-none ${colorScheme === 'purple' ? 'ring-2 ring-purple-600' : ''} transition-shadow`}
                          onClick={() => handleColorSchemeChange('purple')}
                        />
                        <button 
                          className={`h-10 w-10 rounded-full bg-emerald-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 focus:outline-none ${colorScheme === 'emerald' ? 'ring-2 ring-emerald-600' : ''} transition-shadow`}
                          onClick={() => handleColorSchemeChange('emerald')}
                        />
                        <button 
                          className={`h-10 w-10 rounded-full bg-amber-600 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 focus:outline-none ${colorScheme === 'amber' ? 'ring-2 ring-amber-600' : ''} transition-shadow`}
                          onClick={() => handleColorSchemeChange('amber')}
                        />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">UI Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="animations" className="font-normal">Enable animations</Label>
                          </div>
                          <Switch id="animations" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="compact-mode" className="font-normal">Use compact mode</Label>
                          </div>
                          <Switch id="compact-mode" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="sidebar" className="font-normal">Always show sidebar</Label>
                          </div>
                          <Switch id="sidebar" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="blur-effects" className="font-normal">Use blur effects</Label>
                          </div>
                          <Switch id="blur-effects" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Notifications Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="glass-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <Bell className="h-5 w-5 text-amber-500" />
                        Application Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="new-report" className="font-normal">New reports</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when a new report is generated</p>
                          </div>
                          <Switch id="new-report" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="data-alerts" className="font-normal">Data alerts</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Get notified of important data changes or anomalies</p>
                          </div>
                          <Switch id="data-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="task-assign" className="font-normal">Task assignments</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when you're assigned to a task</p>
                          </div>
                          <Switch id="task-assign" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="system-updates" className="font-normal">System updates</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about system updates and maintenance</p>
                          </div>
                          <Switch id="system-updates" />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <Mail className="h-5 w-5 text-blue-500" />
                        Email Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-reports" className="font-normal">Weekly report summaries</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive weekly summaries of your data reports</p>
                          </div>
                          <Switch id="email-reports" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-alerts" className="font-normal">Critical alerts</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive emails about critical data issues</p>
                          </div>
                          <Switch id="email-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-news" className="font-normal">Product updates & news</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Receive emails about new features and updates</p>
                          </div>
                          <Switch id="email-news" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button>Save Notification Settings</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
            
            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <Card className="glass-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <Key className="h-5 w-5 text-amber-500" />
                        Change Password
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="current-password">Current Password</Label>
                          <input
                            id="current-password"
                            type="password"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            placeholder="••••••••"
                          />
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <Label htmlFor="new-password">New Password</Label>
                            <input
                              id="new-password"
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="••••••••"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <input
                              id="confirm-password"
                              type="password"
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </div>
                      <Button className="mt-2">Update Password</Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <Lock className="h-5 w-5 text-blue-500" />
                        Two-Factor Authentication
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Add an extra layer of security to your account by enabling two-factor authentication.
                          </p>
                          <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-2">
                            Two-factor authentication is currently disabled.
                          </p>
                        </div>
                        <Button>Enable 2FA</Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <Shield className="h-5 w-5 text-emerald-500" />
                        Security Preferences
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="session-timeout" className="font-normal">Automatic session timeout</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Automatically log out after period of inactivity</p>
                          </div>
                          <Switch id="session-timeout" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="login-alerts" className="font-normal">Login alerts</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Get notified of new login attempts on your account</p>
                          </div>
                          <Switch id="login-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="device-history" className="font-normal">Device history</Label>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Keep a record of devices that have logged into your account</p>
                          </div>
                          <Switch id="device-history" defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="glass-card">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Login Activity</h2>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Today at 10:45 AM
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            Windows 11 • Chrome • San Francisco, CA, USA
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Current
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Yesterday at 8:30 PM
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            iOS 16 • Safari • San Francisco, CA, USA
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            December 5, 2023 at 2:15 PM
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            macOS • Firefox • San Francisco, CA, USA
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">View All Login Activity</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
