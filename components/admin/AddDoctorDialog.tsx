import { useCreateDoctor } from '@/hooks/use-doctors';
import { Gender } from '@prisma/client';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { formatPhoneNumber } from '@/lib/utils';

interface AddDoctorDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDoctorDialog = ({ isOpen, onClose }: AddDoctorDialogProps) => {

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    speciality: "",
    gender: "MALE" as Gender,
    isActive: true
  });

  const createaDoctorMutation = useCreateDoctor()

  const handlePhoneChange = (value: string) => {
    const formattedPhoneNumber = formatPhoneNumber(value)
    setNewDoctor({...newDoctor, phone:formattedPhoneNumber})
  }

  const handleSave = () => {
    createaDoctorMutation.mutate(
      {...newDoctor},
      {onSuccess: handleClose}
    )
  }

  const handleClose = () => {
    onClose();
    setNewDoctor({
      name: "",
      email: "",
      phone: "",
      speciality: "",
      gender: "MALE",
      isActive: true
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
          <DialogDescription>Add a new doctor to the platform.</DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            {/* name */}
            <div className="space-y-2">
              <Label htmlFor='new-name'>Name *</Label>
              <Input
                id="new-name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({...newDoctor, name:e.target.value})}
                placeholder='Dr. John Doe'
              />
            </div>
            {/* speciality */}
            <div className="space-y-2">
              <Label htmlFor='new-speciality'>Speciality *</Label>
              <Input
                id="new-speciality"
                value={newDoctor.speciality}
                onChange={(e) => setNewDoctor({...newDoctor, speciality:e.target.value})}
                placeholder='General Dentistry'
              />
            </div>
          </div>
          {/* email */}
          <div className="space-y-2">
            <Label htmlFor='new-email'>Email *</Label>
            <Input
              id="new-email"
              value={newDoctor.email}
              onChange={(e) => setNewDoctor({...newDoctor, email:e.target.value})}
              placeholder='doctor@example.com'
            />
          </div>
          {/* phone */}
          <div className="space-y-2">
            <Label htmlFor='new-phone'>Phone *</Label>
            <Input
              id="new-phone"
              value={newDoctor.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder='+1 (555) 123-4567'
            />
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {/* gender */}
            <div className="space-y-2">
                <Label htmlFor='new-gender'>Gender</Label>
                <Select
                value={newDoctor.gender || ""}
                onValueChange={(value) => setNewDoctor({...newDoctor, gender: value as Gender})}
                >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
                </Select>
            </div>
            {/* status */}
            <div className="space-y-2">
                <Label htmlFor='new-status'>Status</Label>
                <Select
                value={newDoctor.isActive ? "active" : "inactive"}
                onValueChange={(value) => setNewDoctor({...newDoctor, isActive: value === "active"})}
                >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            className='bg-primary hover:bg-primary/90 transition'
            disabled={!newDoctor.name || !newDoctor.email || !newDoctor.speciality || createaDoctorMutation.isPending}
          >
            {createaDoctorMutation.isPending ? "Adding..." : "Add Doctor"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddDoctorDialog
