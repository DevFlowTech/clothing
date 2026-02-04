"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
}

export function SizeGuideModal({ open, onClose }: SizeGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="tops" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tops">Tops</TabsTrigger>
            <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
            <TabsTrigger value="shoes">Shoes</TabsTrigger>
          </TabsList>

          <TabsContent value="tops" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>How to Measure</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Chest:</strong> Measure around the fullest part of
                  your chest, keeping the tape horizontal.
                </li>
                <li>
                  <strong>Waist:</strong> Measure around your natural waistline,
                  keeping the tape comfortably loose.
                </li>
                <li>
                  <strong>Sleeve:</strong> Measure from the center back of your
                  neck to your wrist with your arm slightly bent.
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Size</th>
                    <th className="text-left p-3 font-semibold">Chest (cm)</th>
                    <th className="text-left p-3 font-semibold">Waist (cm)</th>
                    <th className="text-left p-3 font-semibold">Sleeve (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">XS</td>
                    <td className="p-3">81-86</td>
                    <td className="p-3">66-71</td>
                    <td className="p-3">81</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">S</td>
                    <td className="p-3">86-91</td>
                    <td className="p-3">71-76</td>
                    <td className="p-3">84</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">M</td>
                    <td className="p-3">91-97</td>
                    <td className="p-3">76-81</td>
                    <td className="p-3">86</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">L</td>
                    <td className="p-3">97-102</td>
                    <td className="p-3">81-86</td>
                    <td className="p-3">89</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">XL</td>
                    <td className="p-3">102-107</td>
                    <td className="p-3">86-91</td>
                    <td className="p-3">91</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-3 font-medium">XXL</td>
                    <td className="p-3">107-112</td>
                    <td className="p-3">91-97</td>
                    <td className="p-3">94</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Fit Tip:</strong> Our tops are designed for a regular
                fit. If you prefer a looser fit, we recommend sizing up.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="bottoms" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>How to Measure</h3>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Waist:</strong> Measure around your natural waistline
                  where you normally wear your pants.
                </li>
                <li>
                  <strong>Hip:</strong> Measure around the fullest part of your
                  hips.
                </li>
                <li>
                  <strong>Inseam:</strong> Measure from the top of your inner
                  thigh to your ankle.
                </li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Size</th>
                    <th className="text-left p-3 font-semibold">Waist (cm)</th>
                    <th className="text-left p-3 font-semibold">Hip (cm)</th>
                    <th className="text-left p-3 font-semibold">Inseam (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">XS (28)</td>
                    <td className="p-3">71-74</td>
                    <td className="p-3">86-89</td>
                    <td className="p-3">76</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">S (30)</td>
                    <td className="p-3">76-79</td>
                    <td className="p-3">91-94</td>
                    <td className="p-3">79</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">M (32)</td>
                    <td className="p-3">81-84</td>
                    <td className="p-3">97-99</td>
                    <td className="p-3">81</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">L (34)</td>
                    <td className="p-3">86-89</td>
                    <td className="p-3">102-104</td>
                    <td className="p-3">84</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">XL (36)</td>
                    <td className="p-3">91-94</td>
                    <td className="p-3">107-109</td>
                    <td className="p-3">86</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-3 font-medium">XXL (38)</td>
                    <td className="p-3">97-99</td>
                    <td className="p-3">112-114</td>
                    <td className="p-3">89</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Fit Tip:</strong> Our pants are designed for a slim fit.
                If you're between sizes, we recommend sizing up.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="shoes" className="space-y-4">
            <div className="prose dark:prose-invert max-w-none">
              <h3>How to Measure</h3>
              <ul className="text-sm space-y-2">
                <li>Stand on a piece of paper and trace your foot outline.</li>
                <li>Measure the length from heel to toe in centimeters.</li>
                <li>Compare your measurement with the chart below.</li>
              </ul>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">US Size</th>
                    <th className="text-left p-3 font-semibold">UK Size</th>
                    <th className="text-left p-3 font-semibold">EU Size</th>
                    <th className="text-left p-3 font-semibold">
                      Foot Length (cm)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">7</td>
                    <td className="p-3">6</td>
                    <td className="p-3">40</td>
                    <td className="p-3">25.0</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">8</td>
                    <td className="p-3">7</td>
                    <td className="p-3">41</td>
                    <td className="p-3">25.7</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">9</td>
                    <td className="p-3">8</td>
                    <td className="p-3">42</td>
                    <td className="p-3">26.3</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">10</td>
                    <td className="p-3">9</td>
                    <td className="p-3">43</td>
                    <td className="p-3">27.0</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">11</td>
                    <td className="p-3">10</td>
                    <td className="p-3">44</td>
                    <td className="p-3">27.6</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-3 font-medium">12</td>
                    <td className="p-3">11</td>
                    <td className="p-3">45</td>
                    <td className="p-3">28.3</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>Fit Tip:</strong> If you have wide feet or are between
                sizes, we recommend sizing up for a more comfortable fit.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
